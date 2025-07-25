'use client';

import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { currentUser } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { X, PlusCircle } from 'lucide-react';
import Image from 'next/image';

export default function SettingsPage() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Profile Saved!',
      description: 'Your changes have been successfully saved.',
    });
  };

  return (
    <AppShell>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Profile Settings</h2>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle>Edit Your Profile</CardTitle>
                <CardDescription>Make changes to your public profile here. Click save when you&apos;re done.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-2">
                        <Label>Your Photos</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {currentUser.photos.map((photo, index) => (
                                <div key={index} className="relative group aspect-square">
                                    <Image src={photo} alt={`Your photo ${index + 1}`} layout="fill" objectFit="cover" className="rounded-lg" data-ai-hint="person" />
                                    <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                            <button type="button" className="flex items-center justify-center w-full aspect-square border-2 border-dashed rounded-lg hover:bg-accent transition-colors">
                                <PlusCircle className="h-8 w-8 text-muted-foreground" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" defaultValue={currentUser.name} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="age">Age</Label>
                            <Input id="age" type="number" defaultValue={currentUser.age} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" defaultValue={currentUser.location} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio">Your Bio</Label>
                        <Textarea id="bio" defaultValue={currentUser.bio} rows={5} placeholder="Tell us about yourself..." />
                    </div>
                    
                    <div className="space-y-2">
                        <Label>Interests</Label>
                        <div className="flex flex-wrap gap-2">
                            {currentUser.interests.map(interest => (
                                <Badge key={interest} variant="secondary" className="text-sm py-1 pl-3 pr-2">
                                    {interest}
                                    <button className="ml-2 rounded-full hover:bg-background p-0.5"><X className="h-3 w-3"/></button>
                                </Badge>
                            ))}
                            <Input placeholder="Add new interest..." className="w-40" />
                        </div>
                    </div>

                    <Button type="submit">Save Changes</Button>
                </form>
            </CardContent>
        </Card>

      </div>
    </AppShell>
  );
}
