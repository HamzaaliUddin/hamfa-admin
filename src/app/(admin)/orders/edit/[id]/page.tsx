'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CrudLayout } from '@/components/common/crud-layout';
import { Textarea } from '@/components/ui/textarea';

export default function EditOrderPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [orderStatus, setOrderStatus] = useState<string>('pending');
  const [paymentStatus, setPaymentStatus] = useState<string>('pending');

  useEffect(() => {
    // Simulate API call to fetch order
    setTimeout(() => {
      setOrderStatus('pending');
      setPaymentStatus('pending');
      setIsLoading(false);
    }, 500);
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // TODO: API call to update order
    setTimeout(() => {
      setLoading(false);
      router.push('/orders');
    }, 1000);
  };

  if (isLoading) {
    return (
      <CrudLayout
        title="Loading..."
        description="Please wait"
        backButton={{
          label: 'Back to Orders',
          href: '/orders',
        }}
      >
        <div>Loading order...</div>
      </CrudLayout>
    );
  }

  return (
    <CrudLayout
      title="Edit Order"
      description="Update order status and details"
      backButton={{
        label: 'Back to Orders',
        href: '/orders',
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Order Status Update</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="orderNumber">Order Number</Label>
              <div className="text-sm font-medium text-muted-foreground">ORD-2024-001</div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="orderStatus">Order Status *</Label>
              <Select value={orderStatus} onValueChange={setOrderStatus} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select order status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentStatus">Payment Status *</Label>
              <Select value={paymentStatus} onValueChange={setPaymentStatus} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="trackingNumber">Tracking Number</Label>
              <input
                type="text"
                id="trackingNumber"
                placeholder="Enter tracking number"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Internal Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add any internal notes about this order..."
                rows={4}
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? 'Updating...' : 'Update Order'}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </CrudLayout>
  );
}
