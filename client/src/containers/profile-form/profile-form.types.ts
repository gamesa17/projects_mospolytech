export type ProfileFormValues = {
  firstName: string;
  lastName: string;

  city: string;
  phone: string;
};

export type ProfileFormProps = {
  initialValues?: Partial<ProfileFormValues>;
  onSubmit: (values: ProfileFormValues) => void;
};
