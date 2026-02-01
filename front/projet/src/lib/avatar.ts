import { supabaseAdmin } from './supabase';

const AVATAR_BUCKET = 'avatars';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

/**
 * Valide le fichier image avant upload
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  // Vérifier la taille
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: 'Le fichier ne doit pas dépasser 5MB' };
  }

  // Vérifier le type
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, error: 'Seuls les formats JPEG, PNG, WebP et GIF sont acceptés' };
  }

  return { valid: true };
}

/**
 * Génère un nom de fichier unique
 */
export function generateAvatarFileName(userId: number, originalName: string): string {
  const timestamp = Date.now();
  const extension = originalName.split('.').pop();
  return `user-${userId}-${timestamp}.${extension}`;
}

/**
 * Upload un avatar vers Supabase Storage
 */
export async function uploadAvatar(
  userId: number,
  file: File
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const fileName = generateAvatarFileName(userId, file.name);
    
    // Convertir le File en Buffer pour Supabase
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { data, error } = await supabaseAdmin.storage
      .from(AVATAR_BUCKET)
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
        cacheControl: '3600'
      });

    if (error) {
      console.error('Erreur upload Supabase:', error);
      return { success: false, error: 'Erreur lors de l\'upload du fichier' };
    }

    // Récupérer l'URL publique
    const { data: urlData } = supabaseAdmin.storage
      .from(AVATAR_BUCKET)
      .getPublicUrl(data.path);

    return { success: true, url: urlData.publicUrl };
  } catch (error) {
    console.error('Erreur uploadAvatar:', error);
    return { success: false, error: 'Erreur serveur lors de l\'upload' };
  }
}

/**
 * Supprime un ancien avatar de Supabase Storage
 */
export async function deleteAvatar(avatarUrl: string): Promise<boolean> {
  try {
    // Extraire le nom du fichier depuis l'URL
    const fileName = avatarUrl.split('/').pop();
    if (!fileName) return false;

    const { error } = await supabaseAdmin.storage
      .from(AVATAR_BUCKET)
      .remove([fileName]);

    if (error) {
      console.error('Erreur suppression avatar:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erreur deleteAvatar:', error);
    return false;
  }
}

/**
 * Obtient l'URL de l'avatar ou retourne un avatar par défaut
 */
export function getAvatarUrl(avatarUrl: string | null | undefined): string {
  if (avatarUrl) {
    return avatarUrl;
  }
  // Avatar par défaut (vous pouvez utiliser une image dans /public ou un service comme UI Avatars)
  return `https://ui-avatars.com/api/?background=3b82f6&color=fff&size=200&name=User`;
}
