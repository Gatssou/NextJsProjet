import { Suspense } from 'react';
import ResetPasswordForm from '@/app/components/ResetPassWord/ResetPasswordForm';

export const metadata = {
  title: 'Réinitialiser le mot de passe',
  description: 'Créer un nouveau mot de passe',
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Chargement...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}