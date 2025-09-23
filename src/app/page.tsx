import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex h-full items-center justify-center bg-background p-4 md:p-8">
      <Card className="w-full max-w-2xl text-center shadow-2xl">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Globe className="h-8 w-8" />
          </div>
          <CardTitle className="font-headline text-4xl">
            Welcome to Sovereign Navigator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-muted-foreground">
            Your portal to the decentralized web. Select a destination from the
            sidebar to begin your journey, or use the AI summary tool to learn
            more about a link before you visit.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
