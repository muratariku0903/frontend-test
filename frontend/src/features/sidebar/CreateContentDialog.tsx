import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useCreateContent } from '../../api/queries';
import cancelIcon from '../../assets/icons/cancel.svg';
import saveIcon from '../../assets/icons/save.svg';
import { Button } from '../../components/ui/Button';
import { Dialog } from '../../components/ui/Dialog';
import { TextArea } from '../../components/ui/TextArea';
import { TextField } from '../../components/ui/TextField';
import { contentSchema } from '../../lib/contentSchema';

type Props = {
  onCreated: (id: number) => void;
  onClose: () => void;
};

export const CreateContentDialog = ({ onCreated, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(contentSchema),
    mode: 'onChange',
    defaultValues: { title: '', body: '' },
  });
  const createContent = useCreateContent();

  const save = handleSubmit((input) =>
    createContent.mutate(input, {
      onSuccess: (content) => onCreated(content.id),
    }),
  );

  return (
    <Dialog
      title="New page"
      onClose={onClose}
      actions={
        <>
          <Button
            variant="normal"
            size="compact"
            icon={cancelIcon}
            label="Cancel"
            onClick={onClose}
          />
          <Button
            variant="primary"
            size="compact"
            icon={saveIcon}
            label="Save"
            onClick={save}
            disabled={!isValid || createContent.isPending}
          />
        </>
      }
    >
      <div className="flex flex-col gap-5">
        <TextField
          aria-label="タイトル"
          error={errors.title?.message}
          {...register('title')}
        />
        <div className="h-64">
          <TextArea
            aria-label="本文"
            error={errors.body?.message}
            {...register('body')}
          />
        </div>
      </div>
    </Dialog>
  );
};
