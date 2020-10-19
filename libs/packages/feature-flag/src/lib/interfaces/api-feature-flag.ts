import { Feature } from '../models/feature.model';

export interface IApiFeatureFlag {
  getFeatures(featureName?: string): Promise<Feature[]>;
  getFeature(featureName?: string): Promise<Feature>;
}
