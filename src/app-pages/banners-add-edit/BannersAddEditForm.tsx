import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CrudLayout, CrudFormSection } from '@/components/common/crud-layout';
import FormInput from '@/components/Form/FormInput';
import FormSelect from '@/components/Form/FormSelect';
import { BannerStatusEnums } from '@/types/api.types';
import { bannersFormRules } from './BannersAddEdit.helper';
import BannersAddEditMedia from './BannersAddEditMedia';

type Props = {
  isEdit?: boolean;
  title?: string;
  initialValues?: any;
  handleRequest: any;
};

const BannersAddEditForm = ({
  isEdit,
  title,
  initialValues,
  handleRequest
}: Props) => {
  const router = useRouter();

  const methods = useForm({
    defaultValues: initialValues
      ? initialValues
      : {
          status: BannerStatusEnums.Active,
          title_en: '',
          title_ar: '',
          image_url: null
        }
  });
  const { handleSubmit, control, setError, reset } = methods;
  const formRules = bannersFormRules();

  const handleForm = (values: any) => {
    const formData = new FormData();
    const selectedFirstFile = values?.image_url?.[0];

    formData.append('status', values.status);
    formData.append('title_en', values.title_en);
    formData.append('title_ar', values.title_ar);

    if (selectedFirstFile) {
      formData.append('image_url', selectedFirstFile);
    }

    handleRequest(formData, setError, reset);
  };

  const handleGoBack = () => {
    router.back();
  };

  const statusOptions = [
    { value: BannerStatusEnums.Active, label: 'Active' },
    { value: BannerStatusEnums.Inactive, label: 'Inactive' }
  ];

  return (
    <CrudLayout
      title={isEdit ? title || 'Edit Banner' : 'Add Banner'}
      description={isEdit ? 'Update banner details' : 'Create a new banner'}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleForm)}>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <CrudFormSection title="Banner Details">
                <Card className="p-6">
                  <div className="space-y-4">
                    <FormInput
                      name="title_en"
                      label="Banner Title (English)"
                      control={control}
                      rules={formRules.title}
                      placeholder="Enter banner title in English"
                    />
                    <FormInput
                      name="title_ar"
                      label="Banner Title (Arabic)"
                      control={control}
                      rules={formRules.title}
                      placeholder="Enter banner title in Arabic"
                      dir="rtl"
                    />

                    <FormSelect
                      options={statusOptions}
                      name="status"
                      label="Banner Status"
                      control={control}
                      rules={formRules.status}
                    />
                  </div>
                </Card>
              </CrudFormSection>
            </div>

            <div className="space-y-6">
              <CrudFormSection title="Banner Image">
                <Card className="p-6">
                  <BannersAddEditMedia isEdit={isEdit} />
                </Card>
              </CrudFormSection>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-4">
            <Button type="button" variant="outline" onClick={handleGoBack}>
              Cancel
            </Button>
            <Button type="submit">Save Banner</Button>
          </div>
        </form>
      </FormProvider>
    </CrudLayout>
  );
};

export default BannersAddEditForm;

