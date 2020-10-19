import { IApiFeatureFlag } from './interfaces/api-feature-flag';
import { Feature } from './models/feature.model';
export class ApiFeatureFlag implements IApiFeatureFlag {
  url: string;

  constructor(url: string) {
    this.url = url;
  }
  getFeature(featureName: string): Promise<Feature> {
    return fetch(this.url, { method: 'post', body: JSON.stringify({}) })
    .then(this.handleErrors)
    .then((res: Response) => res.json())
    .then((res: Feature[]) => {
      const feature = res.find((item: Feature) => item.name === featureName);

      return feature;
    })
    .catch((ex) => {
      throw Error('Failed to fetch feature.' + ex);
    });
  }

  getFeatures(): Promise<Feature[]> {
    return fetch(this.url, { method: 'post', body: JSON.stringify({}) })
    .then(this.handleErrors)
    .then((res: Response) => res.json())
    .catch((ex) => {
      throw Error('Failed to fetch feature.' + ex);
    });
  }

  handleErrors(response: Response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }

    return response;
  }
}
