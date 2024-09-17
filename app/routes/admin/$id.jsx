import { prisma } from '../../utils/db.server';
import { Form, redirect, useLoaderData } from 'remix';

export async function loader({ params }) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id, 10) },
  });
  return { product };
}

export async function action({ request, params }) {
  const formData = new URLSearchParams(await request.text());
  const name = formData.get('name');
  const price = parseFloat(formData.get('price'));

  await prisma.product.update({
    where: { id: parseInt(params.id, 10) },
    data: { name, price },
  });

  return redirect('/admin');
}

export default function EditProduct() {
  const { product } = useLoaderData();

  return (
    <div>
      <h1>Edit Product</h1>
      <Form method="post">
        <label>
          Name:
          <input type="text" name="name" defaultValue={product.name} />
        </label>
        <label>
          Price:
          <input type="number" step="0.01" name="price" defaultValue={product.price} />
        </label>
        <button type="submit">Update Product</button>
      </Form>
    </div>
  );
}
