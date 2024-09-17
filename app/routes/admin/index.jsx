import { useLoaderData } from '@remix-run/react';
import { prisma } from '../../utils/db.server';

export async function loader() {
  const products = await prisma.product.findMany();
  return { products };
}

export default function AdminIndex() {
  const { products } = useLoaderData();

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <a href={`/admin/${product.id}`}>Edit</a>
          </li>
        ))}
      </ul>
      <a href="/admin/new">Add New Product</a>
    </div>
  );
}
