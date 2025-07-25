'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, X, MapPin, Tag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ProfileCardProps {
  user: User;
  onAction: (userId: number) => void;
}

type Action = 'like' | 'pass';

export function ProfileCard({ user, onAction }: ProfileCardProps) {
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);
  const [action, setAction] = useState<Action | null>(null);
  const { toast } = useToast();

  const handleAction = (actionType: Action) => {
    setAction(actionType);
    setExitDirection(actionType === 'like' ? 'right' : 'left');
    
    // Simulate API call and then remove card from view
    setTimeout(() => {
        onAction(user.id);
        if (actionType === 'like') {
            toast({
                title: "It's a Match!",
                description: `You and ${user.name} have liked each other.`,
            });
        }
    }, 300);
  };

  const rotation = action === 'like' ? 'rotate-[15deg]' : '-rotate-[15deg]';
  const translate = exitDirection === 'right' ? 'translate-x-[200%]' : '-translate-x-[200%]';

  if (!user) return null;

  return (
    <div
      className={cn(
        'transition-all duration-300 ease-in-out',
        exitDirection && `${translate} ${rotation} opacity-0`
      )}
    >
      <Card className="relative w-full max-w-sm overflow-hidden rounded-2xl shadow-xl">
        <div className="relative h-[450px] w-full">
          <Image
            src={user.photos[0]}
            alt={user.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="person portrait"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <CardContent className="absolute bottom-0 w-full p-6 text-white">
            <h2 className="text-3xl font-bold">{user.name}, {user.age}</h2>
            <div className="flex items-center gap-2 text-sm opacity-90">
              <MapPin className="h-4 w-4" />
              <span>{user.location}</span>
            </div>
            <p className="mt-2 text-sm opacity-90 line-clamp-2">{user.bio}</p>
          </CardContent>
        </div>
        <div className="bg-card p-4">
            <div className="mb-4">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground"><Tag className="h-4 w-4" />Interests</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                    {user.interests.map((interest) => (
                        <Badge key={interest} variant="secondary">{interest}</Badge>
                    ))}
                </div>
            </div>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" size="lg" className="h-16 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-500/10 hover:text-red-500" onClick={() => handleAction('pass')}>
              <X className="h-8 w-8" />
            </Button>
            <Button variant="outline" size="lg" className="h-16 rounded-full border-2 border-green-500 text-green-500 hover:bg-green-500/10 hover:text-green-500" onClick={() => handleAction('like')}>
              <Heart className="h-8 w-8" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
