import { useCallback, useState } from 'react';
import { Dialog } from '../dialog';
import { Button } from '../button';
import { Title } from '../title';
import { Input } from '../input';
import { Container } from './styles';
import { useFetchAPI } from '../../hooks/useFetchAPI';
import { CreateCategoryData } from '../../validators/types';
import { useForm } from 'react-hook-form';
import { theme } from '../../styles/theme';
import { createCategorySchema } from '../../validators/schemas';
import { zodResolver } from '@hookform/resolvers/zod';

export function CreateCategoryDialog() {
  const { createCategory, fetchCategories } = useFetchAPI();

  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm<CreateCategoryData>({
    defaultValues: {
      title: '',
      color: theme.colors.primary,
    },
    resolver: zodResolver(createCategorySchema),
  });

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onSubmit = useCallback(
    async (data: CreateCategoryData) => {
      await createCategory(data);
      handleClose();
      await fetchCategories();
    },
    [handleClose, createCategory, fetchCategories],
  );

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      trigger={<Button>Nova categoria</Button>}
    >
      <Container>
        <Title
          title="Nova Categoria"
          subtitle="Crie uma nova categoria para suas transações"
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              label="Nome"
              placeholder="Nome da categoria..."
              {...register('title')}
            />
            <Input label="Cor" type="color" {...register('color')} />
          </div>
          <footer>
            <Button onClick={handleClose} variant="outline" type="button">
              Calcelar
            </Button>
            <Button type="submit">Cadastrar</Button>
          </footer>
        </form>
      </Container>
    </Dialog>
  );
}
