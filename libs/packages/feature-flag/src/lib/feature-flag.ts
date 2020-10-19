import { FFConfig } from './models/feature-flag-config.model';
import { Feature } from './models/feature.model';
import { Observable, Observer, of, timer } from 'rxjs';
import { map } from 'rxjs/operators';

class FeatureFlagClass {
  features: Observable<Feature[]>;
  private config: FFConfig;
  private features$: Feature[];

  /**
   * Initialization
   * @param {FFConfig} config
   */
  async init(config: FFConfig): Promise<void> {
    if (!config.url) {
      throw new Error('url was not provided.');
    }

    this.config = config;

    this.features = this.getFeatures();
  }

  /**
   * Get a list of feature names
   * @param {String} featureName
   * @return {Feature[]}
   */
  private getFeatures(): Observable<Feature[]> {
    return new Observable<Feature[]>((observer: Observer<Feature[]>) => {
      const apiUrl = this.config.url;

      timer(0, 5000).subscribe(() => {
        fetch(apiUrl, {
          method: 'post',
          body: JSON.stringify({}),
        })
        .then(this.handleErrors)
        .then((response: Response) => response.json())
        .then((response: Feature[]) => {
          this.features$ = response;

          observer.next(response);
        })
        .catch((err) => observer.error(err));
      });
    });
  }

  getFeature(featureName: string): Observable<Feature> {
    return this.getFeatures().pipe(
      map(items => {
        const feature = items.find((item: Feature) => item.name === featureName);
        return feature;
      })
    );
  }

  private handleErrors(response: Response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }

    return response;
  }
}

export const FeatureFlag = new FeatureFlagClass();
