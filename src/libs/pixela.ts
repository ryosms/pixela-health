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
  constructor(private endpoint: string) {
  }

  public async register() {
    return await new Promise(resolve => {
      setTimeout(resolve, 3000)
    });
  }

}

const pixela = new Pixela("https://pixe.la");
export default pixela;
