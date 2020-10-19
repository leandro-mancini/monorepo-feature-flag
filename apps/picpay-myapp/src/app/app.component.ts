import { Component } from '@angular/core';
import { FeatureFlag } from '@picpay-myapp/packages/feature-flag';

@Component({
  selector: 'picpay-myapp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Feature Flags';
  features: Promise<any> = FeatureFlag.features;
  feature: Promise<any> = FeatureFlag.getFeature('feature_qrcode_bills');
}
