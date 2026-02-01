import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ExternalLink, Copy, Download, RefreshCw, Send } from "lucide-react";
import { platformConfig, type AdVariant, type Platform } from "@/lib/api";
import { toast } from "sonner";

interface VariantCardProps {
  variant: AdVariant;
  onRegenerateHeadline?: () => void;
  onPublish?: () => void;
}

export function VariantCard({ variant, onRegenerateHeadline, onPublish }: VariantCardProps) {
  const config = platformConfig[variant.platform];
  const imageUrl = variant.platform === 'meta'
    ? (variant.image_urls?.square || variant.image_urls?.portrait)
    : (variant.image_urls?.landscape || variant.image_urls?.square);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} הועתק!`);
  };

  return (
    <Card className="rounded-2xl shadow-card p-5 gradient-card border-border/50 hover:border-primary/30 hover:shadow-lg transition-all">
      <div className="grid gap-4">
        {/* Platform Badge */}
        <div className="flex items-center justify-between">
          <Badge className={`${config.color} text-sm px-3 py-1`}>
            <span className="ml-1">{config.icon}</span>
            {config.label}
          </Badge>
          {variant.audience?.age_range && (
            <span className="text-xs text-muted-foreground">
              גיל {variant.audience.age_range.min}-{variant.audience.age_range.max}
            </span>
          )}
        </div>

        {/* Image Preview */}
        <div className="relative rounded-xl overflow-hidden aspect-video bg-muted/30">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="תמונת קריאייטיב"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-muted-foreground/50" />
            </div>
          )}
        </div>

        {/* Headline */}
        <h3 className="font-bold text-lg leading-tight">{variant.headline}</h3>

        {/* Primary Text */}
        <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed line-clamp-4">
          {variant.primary_text}
        </p>

        {/* Description */}
        {variant.description && (
          <p className="text-xs text-muted-foreground/70 italic">{variant.description}</p>
        )}

        {/* CTA & Audience Info */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary" className="font-medium">
            {variant.cta.replace(/_/g, ' ')}
          </Badge>
          {variant.audience?.geo && (
            <Badge variant="outline" className="text-xs">
              {variant.audience.geo.city}
              {variant.audience.geo.radius_km && ` (${variant.audience.geo.radius_km} ק"מ)`}
            </Badge>
          )}
        </div>

        {/* Interests */}
        {variant.audience?.interests && variant.audience.interests.length > 0 && (
          <div className="flex gap-1.5 flex-wrap">
            {variant.audience.interests.map((interest, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="text-xs border-border/50"
              >
                {interest}
              </Badge>
            ))}
          </div>
        )}

        {/* Copy Actions */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(variant.headline, 'כותרת')}
            className="text-xs gap-1.5"
          >
            <Copy className="w-3 h-3" />
            העתק כותרת
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(variant.primary_text, 'טקסט')}
            className="text-xs gap-1.5"
          >
            <Copy className="w-3 h-3" />
            העתק טקסט
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const audienceText = variant.audience?.interests?.join(', ') || '';
              copyToClipboard(audienceText, 'קהל יעד');
            }}
            className="text-xs gap-1.5"
          >
            <Copy className="w-3 h-3" />
            העתק קהל יעד
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => imageUrl && window.open(imageUrl, '_blank')}
            className="text-xs gap-1.5"
          >
            <Download className="w-3 h-3" />
            הורד תמונה
          </Button>
        </div>

        {/* Main Actions */}
        <div className="flex gap-2 pt-1">
          <Button
            variant="outline"
            size="sm"
            onClick={onRegenerateHeadline}
            className="flex-1 gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            צור מחדש
          </Button>
          <Button
            size="sm"
            onClick={onPublish}
            className="flex-1 gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          >
            <Send className="w-4 h-4" />
            פרסם
          </Button>
        </div>
      </div>
    </Card>
  );
}
