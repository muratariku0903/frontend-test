import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUpdateContent } from '../../api/queries';
import cancelIcon from '../../assets/icons/cancel.svg';
import editIcon from '../../assets/icons/edit.svg';
import saveIcon from '../../assets/icons/save.svg';
import { Button } from '../../components/ui/Button';
import { TextArea } from '../../components/ui/TextArea';
import { TextField } from '../../components/ui/TextField';
import { contentSchema } from '../../lib/contentSchema';

type Props = {
  contentId: number;
  name: keyof typeof contentSchema.shape;
  value: string | null;
};

export const EditableField = ({ contentId, name, value }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const updateContent = useUpdateContent();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(z.object({ value: contentSchema.shape[name] })),
    mode: 'onChange',
  });

  const startEditing = () => {
    reset({ value: value ?? '' });
    setIsEditing(true);
  };

  const save = handleSubmit(({ value }) =>
    updateContent.mutate(
      { id: contentId, input: { [name]: value } },
      { onSuccess: () => setIsEditing(false) },
    ),
  );

  const label = name === 'title' ? 'タイトル' : '本文';
  const field = register('value');
  const error = errors.value?.message;

  return (
    <>
      <div className="col-start-1 min-h-0">
        {isEditing ? (
          name === 'title' ? (
            <TextField aria-label={label} error={error} autoFocus {...field} />
          ) : (
            <TextArea aria-label={label} error={error} autoFocus {...field} />
          )
        ) : name === 'title' ? (
          <h1 className="truncate px-[30px] text-2xl leading-10 font-bold">
            {value}
          </h1>
        ) : (
          <div className="scrollbar-design h-full overflow-y-auto rounded-lg bg-white py-[26px] pr-[14px] pl-[30px] leading-6 whitespace-pre-wrap">
            {value}
          </div>
        )}
      </div>

      <div className="col-start-2 flex gap-2.5">
        {isEditing ? (
          <>
            <Button
              variant="normal"
              size="compact"
              icon={cancelIcon}
              label="Cancel"
              onClick={() => setIsEditing(false)}
            />
            <Button
              variant="primary"
              size="compact"
              icon={saveIcon}
              label="Save"
              onClick={save}
              disabled={!isValid || updateContent.isPending}
            />
          </>
        ) : (
          <Button
            variant="primary"
            icon={editIcon}
            label="Edit"
            onClick={startEditing}
          />
        )}
      </div>
    </>
  );
};
