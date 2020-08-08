import axios, {AxiosInstance} from "axios";
import {addDays, format} from "date-fns";

export interface ScaledWeight {
  scaledDate: Date | null;
  weight: string;
  bodyFatPercentage: string;
  visceralFatLevel: string;
  skeletalMusclePercentage: string;
  physicalAge: string;
  basalMetabolism: string;
  bmi: string;
}

export class Pixela {
  public static create(username: string,
                       token: string,
                       graphId: string) {
    return new Pixela(
      "https://pixe.la/v1",
      username,
      token,
      graphId);
  }

  private client: AxiosInstance;

  constructor(endpoint: string,
              username: string,
              token: string,
              graphId: string) {
    this.client = axios.create({
      baseURL: `${endpoint}/users/${username}/graphs/${graphId}`,
    });
    this.client.interceptors.request.use(config => {
      config.headers['X-USER-TOKEN'] = token;
      return config
    })
  }

  public async register(data: ScaledWeight) {
    if (data.scaledDate === null) return Promise.reject();
    const lastPixel = await this._getLastPixel(data.scaledDate);
    const lastWeight = await this._getLastWeight(lastPixel);
    return await this._postPixel(data, lastWeight);
  };

  private async _getLastPixel(scaledDate: Date): Promise<string | null> {
    const to = format(addDays(scaledDate, -1), "yyyyMMdd");
    const res = await this.client.request({
      method: "get",
      url: "/pixels",
      data: {},
      params: {"to": to}
    });

    if (res.status !== 200 || !res.data.pixels) {
      return Promise.reject(res.data);
    }

    const len = res.data.pixels.length;
    if (len === 0) {
      return null;
    }
    return res.data.pixels[len - 1];
  }

  private async _getLastWeight(pixelDate: string | null): Promise<number | null> {
    if (pixelDate === null) return null;
    const res = await this.client.request({
      method: "get",
      url: pixelDate,
      data: {}
    });
    if (res.status !== 200) {
      return Promise.reject(res.data);
    }

    if (!res.data.optionalData) {
      return null;
    }
    const optionalData = JSON.parse(res.data.optionalData);
    if (!optionalData["体重"]) {
      return null;
    }
    return optionalData["体重"];
  }

  private static _parseNumber(target: string): number | null {
    const parsed = Number(target);
    if (isNaN(parsed)) return null;
    return parsed;
  }

  private async _postPixel(data: ScaledWeight, lastWeight: number | null): Promise<boolean> {
    if (!data.scaledDate) return false;
    const date = format(data.scaledDate, "yyyyMMdd");
    const weight = Pixela._parseNumber(data.weight);
    if (weight === null) return Promise.reject();
    const quantity = !!lastWeight ? (weight * 100 - lastWeight * 100) / 100 : 0.0;
    const optionalData = {
      "体重": weight,
      "体脂肪率": Pixela._parseNumber(data.bodyFatPercentage),
      "内臓脂肪レベル": Pixela._parseNumber(data.visceralFatLevel),
      "骨格筋率": Pixela._parseNumber(data.skeletalMusclePercentage),
      "体年齢": Pixela._parseNumber(data.physicalAge),
      "基礎代謝": Pixela._parseNumber(data.basalMetabolism),
      BMI: Pixela._parseNumber(data.bmi)
    };
    const res = await this.client.request({
      method: "post",
      data: {
        "date": date,
        "quantity": `${quantity}`,
        "optionalData": JSON.stringify(optionalData)
      }
    });
    if (res.status !== 200) return Promise.reject("Something went wrong");
    return true;
  }

}
