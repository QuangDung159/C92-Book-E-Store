type AdministrativeUnitEnum = 'city' | 'district' | 'ward';

type ServiceResultHandler = {
  onSuccess?: () => void;
  onFail?: () => void;
  params?: any;
};

export { AdministrativeUnitEnum, ServiceResultHandler };
