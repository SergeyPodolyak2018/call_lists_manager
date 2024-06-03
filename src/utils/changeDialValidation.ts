export const changeDialValidation = {
  parameterIsAbleToChange(dialMode: string) {
    const ableDialStates = ['Predictive', 'Predictive GVP', 'Predictive with seizing'];
    return ableDialStates.includes(dialMode);
  },

  isAbleToChangeDialMode(dialMode: string) {
    type DialModeRules = Record<string, string[]>;

    const dialModeRules: DialModeRules = {
      Predict: ['Predictive', 'Predictive GVP', 'Predictive with seizing', 'Progressive', 'Progressive with seizing'],
      PredictGVP: ['Predictive GVP'],
      PredictAndSeize: [
        'Predictive with seizing',
        'Predictive GVP',
        'Predictive',
        'Progressive',
        'Progressive with seizing',
      ],
      Preview: ['Preview'],
      Progress: ['Progressive', 'Predictive GVP', 'Predictive with seizing', 'Predictive', 'Progressive with seizing'],
      ProgressGVP: ['Progressive GVP'],
      ProgressAndSeize: [
        'Progressive with seizing',
        'Predictive GVP',
        'Predictive with seizing',
        'Predictive',
        'Progressive',
      ],
      PushPreview: ['Push Preview'],
      PowerGVP: ['Power GVP'],
    };

    return dialModeRules[dialMode];
  },

  isAbleToChangeOptimizationMethod(dialMode: string, defaultValue: string) {
    type OptMethodRules = Record<string, string[]>;

    const optMethodRules: OptMethodRules = {
      Predict: ['Agent Busy Factor', 'Overdial Rate', 'Average Waiting Time'],
      PowerGVP: [defaultValue],
      PredictGVP: ['Agent Busy Factor', 'Overdial Rate', 'Average Waiting Time', 'Average Distribution Time'],
      PredictAndSeize: ['Agent Busy Factor', 'Overdial Rate', 'Average Waiting Time'],
      Preview: [defaultValue],
      Progress: [defaultValue],
      ProgressGVP: [defaultValue],
      ProgressAndSeize: [defaultValue],
      PushPreview: [defaultValue],
    };

    return optMethodRules[dialMode];
  },

  getTargetValidation(optMethod: string) {
    type TargetRules = Record<string, { range: [number, number]; defaultValue: number }>;
    const targetRules: TargetRules = {
      BusyFactor: { range: [0, 100], defaultValue: 80 },
      WaitTime: { range: [0, 1000], defaultValue: 30 },
      OverdialRate: { range: [0, 100], defaultValue: 5 },
      DistributionTime: { range: [0, 1000], defaultValue: 30 },
    };

    return targetRules[optMethod];
  },
};
