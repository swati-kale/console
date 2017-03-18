import { fromRequirements, fromString, toRequirements, toString } from '../public/module/k8s/selector';

describe('k8sSelector', () => {
  describe('#fromString', () => {
    it('works for nullable', () => {
      expect(fromString(null)).toEqual({
        matchLabels:      {},
        matchExpressions: []
      });
    });

    it('works for complex expression', () => {
      expect(fromString('key1=value1,key2=value2,key3,!key4,key5 in (value5),key6 in (value6.1,value6.2),key7 notin (value7),key8 notin (value8.1,value8.2)')).toEqual({
        matchLabels: {
          key1: 'value1',
          key2: 'value2'
        },

        matchExpressions: [
          {
            key:      'key3',
            operator: 'Exists',
            values:   []
          },

          {
            key:      'key4',
            operator: 'DoesNotExist',
            values:   []
          },

          {
            key:      'key5',
            operator: 'In',
            values:   ['value5']
          },

          {
            key:      'key6',
            operator: 'In',
            values:   ['value6.1', 'value6.2']
          },

          {
            key:      'key7',
            operator: 'NotIn',
            values:   ['value7']
          },

          {
            key:      'key8',
            operator: 'NotIn',
            values:   ['value8.1', 'value8.2']
          }
        ]
      });
    });
  });

  describe('#toRequirements', () => {
    it('returns empty list given selector as undefined value', () => {
      expect(toRequirements(undefined)).toEqual([]);
    });
  });

  describe('#fromRequirements', () => {
    it('returns undefined given no requirements and undefinedWhenEmpty option', () => {
      expect(fromRequirements([], {undefinedWhenEmpty: true})).toBeUndefined();
    });
  });

  describe('#toString', () => {
    it('works when both "matchLabels" and "matchExpressions" are given', () => {
      expect(toString({
        matchLabels: {
          key1: 'value1',
          key2: 'value2'
        },

        matchExpressions: [
          {
            key:      'key3',
            operator: 'Exists'
          },

          {
            key:      'key4',
            operator: 'DoesNotExist'
          },

          {
            key:      'key5',
            operator: 'In',
            values:   'value5'
          },

          {
            key:      'key6',
            operator: 'In',
            values:   ['value6.1', 'value6.2']
          },

          {
            key:      'key7',
            operator: 'NotIn',
            values:   'value7'
          },

          {
            key:      'key8',
            operator: 'NotIn',
            values:   ['value8.1', 'value8.2']
          }
        ]
      })).toEqual('key1=value1,key2=value2,key3,!key4,key5 in (value5),key6 in (value6.1,value6.2),key7 notin (value7),key8 notin (value8.1,value8.2)');
    });

    it('works when V1 selector is given', () => {
      expect(toString({
        key1: 'value1',
        key2: 'value2'
      })).toEqual('key1=value1,key2=value2');
    });
  });
});
