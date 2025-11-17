/**
 * ============================================
 * EXAMPLE USAGE - TanStack Query Hooks
 * ============================================
 * 
 * This file demonstrates real-world usage of the query hooks.
 * Copy these patterns to your actual components.
 */

'use client';

import { useGetProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '@/queries/products';
import { useGetOrders } from '@/queries/orders';
import { useState } from 'react';

// ==========================================
// EXAMPLE 1: Simple List with Loading States
// ==========================================
export function ProductList() {
  const { data, isLoading, isError, error } = useGetProducts({
    page: 1,
    limit: 10,
  });

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div>
      <h2>Products ({data?.total})</h2>
      {data?.data.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
          <p>Stock: {product.stock}</p>
        </div>
      ))}
    </div>
  );
}

// ==========================================
// EXAMPLE 2: Create with Form
// ==========================================
export function CreateProductForm() {
  const createProduct = useCreateProduct();
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    stock: 0,
    sku: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await createProduct.mutateAsync({
      name: formData.name,
      slug: formData.name.toLowerCase().replace(/ /g, '-'),
      price: formData.price,
      stock: formData.stock,
      sku: formData.sku,
      status: 'active',
    });

    // Reset form after success
    setFormData({ name: '', price: 0, stock: 0, sku: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Product Name"
        required
      />
      <input
        type="number"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
        placeholder="Price"
        required
      />
      <input
        type="number"
        value={formData.stock}
        onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
        placeholder="Stock"
        required
      />
      <input
        value={formData.sku}
        onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
        placeholder="SKU"
        required
      />
      <button type="submit" disabled={createProduct.isPending}>
        {createProduct.isPending ? 'Creating...' : 'Create Product'}
      </button>
      {createProduct.isError && (
        <p style={{ color: 'red' }}>Error: {createProduct.error?.data?.message}</p>
      )}
    </form>
  );
}

// ==========================================
// EXAMPLE 3: Update with Optimistic UI
// ==========================================
export function UpdateProductButton({ productId }: { productId: number }) {
  const updateProduct = useUpdateProduct();

  const handleUpdate = async () => {
    await updateProduct.mutateAsync({
      id: productId,
      data: {
        name: 'Updated Product Name',
        price: 199.99,
      },
    });
  };

  return (
    <button onClick={handleUpdate} disabled={updateProduct.isPending}>
      {updateProduct.isPending ? 'Updating...' : 'Update Product'}
    </button>
  );
}

// ==========================================
// EXAMPLE 4: Delete with Confirmation
// ==========================================
export function DeleteProductButton({ productId }: { productId: number }) {
  const deleteProduct = useDeleteProduct();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct.mutateAsync(productId);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={deleteProduct.isPending}
      style={{ backgroundColor: 'red', color: 'white' }}
    >
      {deleteProduct.isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
}

// ==========================================
// EXAMPLE 5: Pagination with Search
// ==========================================
export function ProductsWithPagination() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  
  const { data, isLoading } = useGetProducts({
    page,
    limit: 20,
    search: search || undefined,
  });

  return (
    <div>
      <input
        type="search"
        placeholder="Search products..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); // Reset to page 1 on search
        }}
      />

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>
            {data?.data.map((product) => (
              <div key={product.id}>{product.name}</div>
            ))}
          </div>

          <div>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>
              Page {page} of {data?.totalPages}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= (data?.totalPages || 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ==========================================
// EXAMPLE 6: Multiple Queries in One Component
// ==========================================
export function Dashboard() {
  const { data: products, isLoading: productsLoading } = useGetProducts({ limit: 5 });
  const { data: orders, isLoading: ordersLoading } = useGetOrders({ limit: 5 });

  if (productsLoading || ordersLoading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div>
      <section>
        <h2>Recent Products</h2>
        {products?.data.map((product) => (
          <div key={product.id}>{product.name}</div>
        ))}
      </section>

      <section>
        <h2>Recent Orders</h2>
        {orders?.data.map((order) => (
          <div key={order.id}>
            Order #{order.orderNumber} - {order.status}
          </div>
        ))}
      </section>
    </div>
  );
}

// ==========================================
// EXAMPLE 7: Conditional Query (with enabled)
// ==========================================
export function ProductDetails({ productId }: { productId: number | null }) {
  // Only fetch when productId exists
  const { data: product, isLoading } = useGetProducts();

  if (!productId) {
    return <div>Select a product to view details</div>;
  }

  if (isLoading) {
    return <div>Loading product...</div>;
  }

  return (
    <div>
      <h2>{product?.data[0].name}</h2>
      <p>{product?.data[0].description}</p>
    </div>
  );
}

// ==========================================
// EXAMPLE 8: Using Callbacks
// ==========================================
export function CreateWithCallbacks() {
  const createProduct = useCreateProduct();

  const handleCreate = () => {
    createProduct.mutate(
      {
        name: 'New Product',
        slug: 'new-product',
        price: 99.99,
        stock: 10,
        sku: 'SKU123',
      },
      {
        onSuccess: (data) => {
          console.log('Product created:', data);
          // Navigate somewhere, show modal, etc.
        },
        onError: (error) => {
          console.error('Failed to create:', error);
          // Show custom error UI
        },
        onSettled: () => {
          console.log('Operation completed (success or error)');
          // Cleanup, hide loading, etc.
        },
      }
    );
  };

  return <button onClick={handleCreate}>Create with Callbacks</button>;
}

// ==========================================
// EXAMPLE 9: Status-based UI
// ==========================================
export function StatusBasedUI() {
  const { data, status } = useGetProducts();

  switch (status) {
    case 'pending':
      return <div>Loading...</div>;
    case 'error':
      return <div>Something went wrong</div>;
    case 'success':
      return <div>Found {data.total} products</div>;
    default:
      return null;
  }
}

// ==========================================
// EXAMPLE 10: Refetch on Demand
// ==========================================
export function RefetchExample() {
  const { data, refetch, isFetching } = useGetProducts();

  return (
    <div>
      <button onClick={() => refetch()} disabled={isFetching}>
        {isFetching ? 'Refreshing...' : 'Refresh Data'}
      </button>
      <div>Products: {data?.total}</div>
    </div>
  );
}

/**
 * ============================================
 * PATTERNS TO COPY:
 * ============================================
 * 
 * 1. Always handle loading & error states
 * 2. Use isPending for mutations, isLoading for queries
 * 3. Use mutateAsync when you need to await
 * 4. Use mutate for fire-and-forget
 * 5. Disable buttons during mutations
 * 6. Use enabled option for conditional queries
 * 7. Toast notifications work automatically
 * 8. Queries auto-refetch after mutations
 */

