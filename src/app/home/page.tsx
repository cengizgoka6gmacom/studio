'use client';

import { useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { ProfileCard } from '@/components/profile-card';
import { mockUsers } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

export default function HomePage() {
  const [users, setUsers] = useState(mockUsers);

  const handleAction = (actedUserId: number) => {
    // Remove the user from the stack
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== actedUserId));
  };
  
  const resetUsers = () => {
    setUsers(mockUsers);
  }

  const activeUser = users[0];

  return (
    <AppShell>
      <div className="flex flex-col items-center justify-center min-h-full bg-background p-4 pt-16 md:pt-4">
        <div className="relative flex-grow flex items-center justify-center w-full">
            {activeUser ? (
                <ProfileCard key={activeUser.id} user={activeUser} onAction={handleAction} />
            ) : (
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-muted-foreground">That's everyone for now!</h2>
                    <p className="mt-2 text-muted-foreground">Check back later for new people.</p>
                    <Button onClick={resetUsers} className="mt-4">
                        <RotateCcw className="mr-2 h-4 w-4" />
                        See them again
                    </Button>
                </div>
            )}
        </div>
      </div>
    </AppShell>
  );
}
