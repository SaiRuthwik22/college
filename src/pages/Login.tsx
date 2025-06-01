import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
// Firebase imports (assume firebase is initialized in src/lib/firebase.ts)
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import '@/styles/custom.css';
import { auth } from '@/lib/firebase';

const illustrationUrl = 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80';

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{email?: string, password?: string, confirmPassword?: string}>({});
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setFieldErrors((prev) => ({ ...prev, email: undefined }));
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setFieldErrors((prev) => ({ ...prev, password: undefined }));
  };
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setFieldErrors((prev) => ({ ...prev, confirmPassword: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    let errors: typeof fieldErrors = {};
    if (!validateEmail(email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (isSignUp) {
      if (!password) errors.password = 'Password is required.';
      if (!confirmPassword) errors.confirmPassword = 'Please confirm your password.';
      if (password && confirmPassword && password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match.';
      }
    }
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setLoading(true);
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 py-8 px-2">
      <div className="w-full max-w-3xl bg-white/90 rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden animate-fade-in">
        {/* Illustration/Accent Side */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-primary/80 to-accent/80 p-8 relative">
          <img src={illustrationUrl} alt="Welcome" className="rounded-2xl shadow-lg w-full h-72 object-cover object-center mb-6" />
          <h2 className="text-2xl font-bold text-white mb-2">Welcome to EduPortal</h2>
          <p className="text-white/80 text-center">Access top educational opportunities, internships, and more. Sign in or create your account to get started!</p>
        </div>
        {/* Form Side */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
          <Card className="w-full shadow-none border-0 bg-transparent">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-center text-3xl font-bold mb-2 text-primary">
                {isSignUp ? 'Create Account' : 'Sign In'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="email" className="text-base font-medium">Email</Label>
                  <Input id="email" type="email" value={email} onChange={handleEmailChange} required autoFocus className="mt-1 px-4 py-2 rounded-lg border border-border focus-visible:ring-0 focus:border-none focus:outline-none transition" />
                  {fieldErrors.email && <div className="text-red-500 text-xs mt-1">{fieldErrors.email}</div>}
                </div>
                <div>
                  <Label htmlFor="password" className="text-base font-medium">Password</Label>
                  <Input id="password" type="password" value={password} onChange={handlePasswordChange} required className="mt-1 px-4 py-2 rounded-lg border border-border focus-visible:ring-0 focus:border-none focus:outline-none transition" />
                  {fieldErrors.password && <div className="text-red-500 text-xs mt-1">{fieldErrors.password}</div>}
                </div>
                {isSignUp && (
                  <div>
                    <Label htmlFor="confirmPassword" className="text-base font-medium">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} required className="mt-1 px-4 py-2 rounded-lg border border-border focus-visible:ring-0 focus:border-none focus:outline-none transition" />
                    {fieldErrors.confirmPassword && <div className="text-red-500 text-xs mt-1">{fieldErrors.confirmPassword}</div>}
                  </div>
                )}
                {error && <div className="text-red-500 text-sm text-center font-medium animate-fade-in">{error}</div>}
                <Button type="submit" className="w-full rounded-lg py-2 text-lg font-semibold shadow-md bg-primary hover:bg-primary/90 transition-colors" disabled={loading}>
                  {loading ? (isSignUp ? 'Signing Up...' : 'Signing In...') : (isSignUp ? 'Sign Up' : 'Sign In')}
                </Button>
              </form>
              <div className="my-5 flex items-center justify-center gap-2">
                <span className="h-px flex-1 bg-border" />
                <span className="text-muted-foreground text-sm">or</span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <Button type="button" variant="outline" className="w-full mb-2 rounded-lg py-2 text-lg font-semibold flex items-center justify-center gap-2 border border-border shadow-sm hover:bg-primary/10 transition-colors" onClick={handleGoogleSignIn} disabled={loading}>
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
                {isSignUp ? 'Sign Up with Google' : 'Sign in with Google'}
              </Button>
              <div className="text-center mt-6">
                {isSignUp ? (
                  <span className="text-base">Already have an account?{' '}
                    <button type="button" className="text-primary underline font-semibold" onClick={() => setIsSignUp(false)}>
                      Sign In
                    </button>
                  </span>
                ) : (
                  <span className="text-base">New user?{' '}
                    <button type="button" className="text-primary underline font-semibold" onClick={() => setIsSignUp(true)}>
                      Create Account
                    </button>
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login; 