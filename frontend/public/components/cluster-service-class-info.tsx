/* eslint-disable no-undef */

import * as React from 'react';
import * as _ from 'lodash-es';

// eslint-disable-next-line no-unused-vars
import { K8sResourceKind, serviceClassDisplayName } from '../module/k8s';
import { ClusterServiceClassIcon } from './cluster-service-class-icon';

export const ClusterServiceClassInfo: React.SFC<ClusterServiceClassInfoProps> = ({obj: serviceClass}) => {
  const displayName = serviceClassDisplayName(serviceClass);
  const description = _.get(serviceClass, 'spec.description');
  const longDescription = _.get(serviceClass, 'spec.externalMetadata.longDescription');
  const documentationURL = _.get(serviceClass, 'spec.externalMetadata.documentationUrl');
  const supportURL = _.get(serviceClass, 'spec.externalMetadata.supportUrl');
  const provider = _.get(serviceClass, 'spec.externalMetadata.providerDisplayName');
  const tags = _.get(serviceClass, 'spec.tags');

  return <div className="co-cluster-service-class-info">
    <div className="co-cluster-service-class-details">
      <ClusterServiceClassIcon serviceClass={serviceClass} iconSize="large" />
      <div>
        <h2 className="co-section-heading co-cluster-service-class-details__name">{displayName}</h2>
        {provider && <p className="co-cluster-service-class-details__provider">Provided by {provider}</p>}
        {tags && <p className="co-cluster-service-class-details__tags">{_.map(tags, (tag, i) => <span className="co-cluster-service-class-details__tag" key={i}>{tag}</span>)}</p>}
        {(documentationURL || supportURL) && <ul className="list-inline">
          {documentationURL && <li className="co-break-word">
            <a href={documentationURL} target="_blank" rel="noopener noreferrer" className="co-external-link">View Documentation</a>
          </li>}
          {supportURL && <li className="co-break-word">
            <a href={supportURL} target="_blank" rel="noopener noreferrer" className="co-external-link">Get Support</a>
          </li>}
        </ul>}
      </div>
    </div>
    {description && <p className="co-cluster-service-class-details__description">{description}</p>}
    {longDescription && <p className="co-cluster-service-class-details__description">{longDescription}</p>}
  </div>;
};

export type ClusterServiceClassInfoProps = {
  obj: K8sResourceKind,
};