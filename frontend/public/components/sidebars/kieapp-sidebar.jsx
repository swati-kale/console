import * as _ from 'lodash-es';
import * as React from 'react';

import { CustomResourceDefinitionModel } from '../../models';
import { referenceForModel } from '../../module/k8s';
import { SampleYaml } from './resource-sidebar';

const samples = [
  {
    header: 'Set rhdm-trial',
    details: 'You can create rhdm-trial.',
    templateName: 'rhdm-trial',
    kind: referenceForModel(CustomResourceDefinitionModel),
  },
  {
    header: 'Set rhpam-production',
    details: 'You can create rhpam-production.',
    templateName: 'rhpam-production',
    kind: referenceForModel(CustomResourceDefinitionModel),
  },
  {
    header: 'Set rhpam-authoring',
    details: 'You can create rhpam-authoring.',
    templateName: 'rhpam-authoring',
    kind: referenceForModel(CustomResourceDefinitionModel),
  },
];





 const SampleYaml = ({sample, loadSampleYaml, downloadSampleYaml}) => {
  const {highlightText, header, subheader, img, details, templateName, kind} = sample;
  return <li className="co-resource-sidebar-item">
    <h5 className="co-resource-sidebar-item__header">
      <span className="text-uppercase">{highlightText}</span> {header} <span className="co-role-sidebar-subheader">{subheader}</span>
    </h5>
    {img && <img src={img} className="co-resource-sidebar-item__img" />}
    <p className="co-resource-sidebar-item__details">
      {details}
    </p>
    <button className="btn btn-link" onClick={() => loadSampleYaml(templateName, kind)}>
      <span className="fa fa-fw fa-paste" aria-hidden="true"></span> Try it
    </button>
    <button className="btn btn-link pull-right" onClick={() => downloadSampleYaml(templateName, kind)}>
      <span className="fa fa-fw fa-download" aria-hidden="true"></span> Download YAML
    </button>
  </li>;
};


export const KieAppSidebar = ({loadSampleYaml, downloadSampleYaml}) => <ol className="co-resource-sidebar-list">
  {_.map(samples, (sample) => <SampleYaml
    key={sample.templateName}
    sample={sample}
    loadSampleYaml={loadSampleYaml}
    downloadSampleYaml={downloadSampleYaml} />)}
</ol>;
