'use client';

import { PageHeader } from '@/components/common/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useGetOrderById } from '@/queries/orders/useGetOrderById.query';
import { format } from 'date-fns';
import { ArrowLeft, CreditCard, FileText, Loader2, MapPin, Package, User } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const paymentStatusColors = {
  paid: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  failed: 'bg-red-100 text-red-800',
};

export default function OrderViewPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const { data: order, isLoading, error } = useGetOrderById(orderId);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Error or not found state
  if (error || !order) {
    return (
      <div className="space-y-6">
        <PageHeader title="Order Details" description="View order information" />
        <div className="py-10 text-center">
          <Package className="text-muted-foreground mx-auto mb-4 h-16 w-16" />
          <h2 className="mb-2 text-2xl font-semibold">Order not found</h2>
          <p className="text-muted-foreground mb-6">
            The order you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button onClick={() => router.push('/orders')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Button>
        </div>
      </div>
    );
  }

  // Main render
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.push('/orders')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <PageHeader
            title={`Order #${order.order_number}`}
            description={`Order ID: ${order.order_id}`}
          />
        </div>
      </div>

      {/* Order Status and Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-muted-foreground text-sm">Order Status</p>
                <Badge className={`mt-1 ${statusColors[order.status]}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>
              <Separator orientation="vertical" className="hidden h-12 sm:block" />
              <div>
                <p className="text-muted-foreground text-sm">Payment Status</p>
                <Badge className={`mt-1 ${paymentStatusColors[order.payment_status]}`}>
                  {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => router.push(`/orders/edit/${order.order_id}`)}
              >
                Edit Order
              </Button>
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Invoice
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Order Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Number</span>
              <span className="font-medium">{order.order_number}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Date</span>
              <span className="font-medium">
                {order.created_at ? format(new Date(order.created_at), 'PPP') : 'N/A'}
              </span>
            </div>
            <Separator />
            {order.completed_at && (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Completed Date</span>
                  <span className="font-medium">{format(new Date(order.completed_at), 'PPP')}</span>
                </div>
                <Separator />
              </>
            )}
            {order.tracking_number && (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tracking Number</span>
                  <span className="font-medium">{order.tracking_number}</span>
                </div>
                <Separator />
              </>
            )}
            {order.notes && (
              <>
                <div>
                  <span className="text-muted-foreground mb-2 block">Notes</span>
                  <p className="text-sm">{order.notes}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Customer ID</span>
              <span className="font-medium">#{order.user_id}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Method</span>
              <span className="font-medium capitalize">{order.payment_method}</span>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Address */}
        {order.shipping_address && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 text-sm">
                {typeof order.shipping_address === 'string' ? (
                  <p>{order.shipping_address}</p>
                ) : (
                  <>
                    {order.shipping_address.name && (
                      <p className="font-medium">{order.shipping_address.name}</p>
                    )}
                    {order.shipping_address.street && <p>{order.shipping_address.street}</p>}
                    {order.shipping_address.city && order.shipping_address.state && (
                      <p>
                        {order.shipping_address.city}, {order.shipping_address.state}
                      </p>
                    )}
                    {order.shipping_address.zip && <p>{order.shipping_address.zip}</p>}
                    {order.shipping_address.country && <p>{order.shipping_address.country}</p>}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Billing Address */}
        {order.billing_address && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Billing Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 text-sm">
                {typeof order.billing_address === 'string' ? (
                  <p>{order.billing_address}</p>
                ) : (
                  <>
                    {order.billing_address.name && (
                      <p className="font-medium">{order.billing_address.name}</p>
                    )}
                    {order.billing_address.street && <p>{order.billing_address.street}</p>}
                    {order.billing_address.city && order.billing_address.state && (
                      <p>
                        {order.billing_address.city}, {order.billing_address.state}
                      </p>
                    )}
                    {order.billing_address.zip && <p>{order.billing_address.zip}</p>}
                    {order.billing_address.country && <p>{order.billing_address.country}</p>}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">Rs {Number(order.subtotal || 0).toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium">Rs {Number(order.shipping || 0).toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span className="font-medium">Rs {Number(order.tax || 0).toFixed(2)}</span>
            </div>
            <Separator />
            {Number(order.discount || 0) > 0 && (
              <>
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span className="font-medium">-Rs {Number(order.discount || 0).toFixed(2)}</span>
                </div>
                <Separator />
              </>
            )}
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>Rs {Number(order.total || 0).toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
