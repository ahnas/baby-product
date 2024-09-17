import { prisma } from '../../utils/db.server';
import { Form, redirect } from 'remix';

export async function action({ request }) {
  const formData = new URLSearchParams(await request.text());
  const name = formData.get('name');
  const price = parseFloat(formData.get('price'));

  await prisma.product.create({
    data: { name, price },
  });

  return redirect('/admin');
}

export default function NewProduct() {
  return (
    <div>
      <h1>New Product</h1>
      <Form method="post">
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          Price:
          <input type="number" step="0.01" name="price" />
        </label>
        <button type="submit">Add Product</button>
      </Form>
    </div>
  );
}
