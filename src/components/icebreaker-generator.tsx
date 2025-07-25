'use client';

import { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { getIcebreakerSuggestions } from '@/lib/actions';
import { User } from '@/lib/data';
import { Skeleton } from './ui/skeleton';

interface IcebreakerGeneratorProps {
  user1: User;
  user2: User;
  onSuggestionClick: (suggestion: string) => void;
}

export function IcebreakerGenerator({ user1, user2, onSuggestionClick }: IcebreakerGeneratorProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsLoading(true);
    setSuggestions([]);
    const result = await getIcebreakerSuggestions(user1, user2);
    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    } else if (result.suggestions) {
      setSuggestions(result.suggestions);
    }
    setIsLoading(false);
  };

  return (
    <Card className="bg-accent/50 border-dashed">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <Wand2 className="text-primary" />
          Need help breaking the ice?
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-4/5" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : suggestions.length > 0 ? (
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start text-left h-auto whitespace-normal"
                onClick={() => onSuggestionClick(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        ) : (
          <Button onClick={handleGenerate} className="w-full">
            <Wand2 className="mr-2 h-4 w-4" />
            Generate Suggestions
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
