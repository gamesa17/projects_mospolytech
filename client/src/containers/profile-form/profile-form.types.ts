export type ProfileFormValues = {
  firstName: string;
  lastName: string;

  email: string;
  phone: string;
};

export type ProfileFormProps = {
  initialValues?: Partial<ProfileFormValues>;
  onSubmit: (values: ProfileFormValues) => void;
};
