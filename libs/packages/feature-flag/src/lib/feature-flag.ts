import { FFConfig } from './models/feature-flag-config.model';
import { Feature } from './models/feature.model';
import { ApiFeatureFlag } from './api-feature-flag';

class FeatureFlagClass {
  features: Promise<Feature[]>;
  feature: string[];
  private config: FFConfig;

  /**
   * Initialization
   * @param {FFConfig} config
   */
  async init(config: FFConfig): Promise<void> {
    if (!config.url) {
      throw new Error('url was not provided.');
    }

    this.config = config;

    // this.features = this.getFeatures();


    const taskResolution = (period) => {
      return new Promise<Feature[]>((resolve, reject) => {
        const interval = setInterval(() => {
          this.getFeatures()
            .then((data) => {
              // console.log(data);
              // if (data === 'failure') {
              //     clearInterval(interval);
              //    reject(Error('fail'));
              //  } else if (data === 'success') {
              //      resolve('complete')
              //  }
               // keep on waiting

              //  this.features = data;

              this.features = new Promise(() => resolve(data));

              resolve(data);

              console.log(data);
           });
        }, period);
      });
    };

    // taskResolution(3000);

    // this.features = taskResolution(3000);

    // console.log(taskResolution(3000));
  }

  /**
   * Get a list of feature names
   * @param {String} featureName
   * @return {Feature[]}
   */
  private async getFeatures(): Promise<Feature[]> {
    const api = new ApiFeatureFlag(this.config.url);

    return api.getFeatures();
  }

  getFeature(featureName: string): Promise<Feature> {
    return this.features
    .then((res: Feature[]) => {
      const feature = res.find((item: Feature) => item.name === featureName);

      return feature;
    })
  }
}

export const FeatureFlag = new FeatureFlagClass();
