import { Avatar as ShadcnAvatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallBackNode?: React.ReactNode;
  className?: string;
}

export function Avatar({
  src = 'https://github.com/shadcn.png',
  alt,
  fallBackNode,
  className,
}: AvatarProps) {
  return (
    <ShadcnAvatar className={className}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallBackNode}</AvatarFallback>
    </ShadcnAvatar>
  );
}
