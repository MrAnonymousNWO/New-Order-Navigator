import { Suspense } from 'react';
import { Viewer } from '@/components/viewer';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function ViewerSkeleton() {
  return (
    <Card className="flex h-screen w-full flex-col rounded-none border-0">
      <div className="flex items-center gap-2 border-b p-2">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-4 w-1/3" />
        <div className="flex-grow" />
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
      <div className="flex-1 p-4">
        <Skeleton className="h-full w-full" />
      </div>
    </Card>
  );
}

export default function ViewPage() {
  return (
    <Suspense fallback={<ViewerSkeleton />}>
      <Viewer />
    </Suspense>
  );
}
