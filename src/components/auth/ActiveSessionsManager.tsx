'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetSessions, useRevokeAllOtherSessions, useRevokeSession } from '@/queries/auth';
import { Monitor, Shield, Smartphone, Tablet, Trash2 } from 'lucide-react';

export function ActiveSessionsManager() {
  const { data: sessions, isLoading } = useGetSessions();
  const revokeSessionMutation = useRevokeSession();
  const revokeAllMutation = useRevokeAllOtherSessions();

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType?.toLowerCase()) {
      case 'mobile':
        return <Smartphone className="h-4 w-4" />;
      case 'tablet':
        return <Tablet className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleRevokeSession = (sessionId: number) => {
    if (confirm('Are you sure you want to revoke this session?')) {
      revokeSessionMutation.mutate(sessionId);
    }
  };

  const handleRevokeAllOther = () => {
    if (confirm('Are you sure you want to log out all other devices?')) {
      // Assuming the first session is the current one
      const currentSessionId = sessions?.[0]?.session_id;
      if (currentSessionId) {
        revokeAllMutation.mutate(currentSessionId);
      }
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>Loading your active sessions...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Active Sessions</CardTitle>
            <CardDescription>
              Manage devices that are currently logged into your account
            </CardDescription>
          </div>
          {sessions && sessions.length > 1 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleRevokeAllOther}
              disabled={revokeAllMutation.isPending}
            >
              <Shield className="mr-2 h-4 w-4" />
              Logout All Other Devices
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {sessions?.length === 0 ? (
          <p className="text-muted-foreground py-8 text-center">No active sessions found</p>
        ) : (
          sessions?.map((session, index) => (
            <div
              key={session.session_id}
              className="flex items-center justify-between border-b pb-4 last:border-0"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-gray-100 p-2">
                  {getDeviceIcon(session.device_type)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{session.device_name}</p>
                    {index === 0 && (
                      <Badge variant="default" className="text-xs">
                        Current
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {session.ip_address && `IP: ${session.ip_address} • `}
                    Last active: {formatDate(session.last_activity)}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Logged in: {formatDate(session.created_at)}
                  </p>
                </div>
              </div>
              {index !== 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRevokeSession(session.session_id)}
                  disabled={revokeSessionMutation.isPending}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
