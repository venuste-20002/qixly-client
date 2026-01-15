'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useVerification from '@/hooks/useVerification';

export default function VerificationCode() {
  const { handleVerification, handleResend, loading } = useVerification();
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const [email] = useState('jackson@terraindws.dev');

  const handleInputChange = (index: number, value: string) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const updatedCode = [...code];
      updatedCode[index] = value;
      setCode(updatedCode);

      // Auto-submit when all 6 digits are filled
      if (updatedCode.every((digit) => digit !== '')) {
        const verificationCode = updatedCode.join('');
        handleVerification({token: verificationCode });
      }

      // Move focus to the next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`) as HTMLInputElement;
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`) as HTMLInputElement;
      prevInput?.focus();
    }
  };

  const handleNumberPadClick = (value: string) => {
    const emptyIndex = code.findIndex((digit) => !digit);
    if (emptyIndex !== -1) {
      handleInputChange(emptyIndex, value);
    }
  };

  const handleBackspace = () => {
    const lastFilledIndex = code.map((digit) => !!digit).lastIndexOf(true);
    if (lastFilledIndex !== -1) {
      handleInputChange(lastFilledIndex, '');
    }
  };

  return (
    <div className="min-h-screen bg-white p-4">
      {/* Header */}
      <div className="relative mb-6">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-0"
          aria-label="Go back"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <div className="absolute -z-10 left-0 top-0 h-32 w-32 bg-red-200 rounded-full opacity-50 blur-3xl" />
        <div className="absolute -z-10 right-0 top-0 h-32 w-32 bg-orange-200 rounded-full opacity-50 blur-3xl" />
      </div>

      {/* Content */}
      <div className="space-y-6 mt-16">
        <div className="space-y-2">
          <h1 className="font-semibold text-[40px]">Verification Code</h1>
          <p className="text-sm text-muted-foreground">
            Please type the verification code sent to {email}
          </p>
        </div>
        {/* Code Input */}
        <div className="flex justify-center gap-2">
          {code.map((digit, index) => (
            <Input
              key={index}
              id={`code-${index}`}
              type="text"
              inputMode="numeric"
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-2xl"
              maxLength={1}
              tabIndex={index + 1}
              autoFocus={index === 0}
            />
          ))}
        </div>

        {/* Resend Link */}
        <p className="text-center mt-5">
          I didn’t receive a code!{' '}
          <strong className="text-primary cursor-pointer" onClick={handleResend}>
            Resend
          </strong>
        </p>

        {/* Number Pad */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          {[...Array(9)].map((_, i) => (
            <Button
              key={i + 1}
              variant="outline"
              className="h-12 text-lg"
              onClick={() => handleNumberPadClick(String(i + 1))}
            >
              {i + 1}
              <span className="text-xs text-muted-foreground ml-1">
                {['', 'ABC', 'DEF', 'GHI', 'JKL', 'MNO', 'PQRS', 'TUV', 'WXYZ'][i]}
              </span>
            </Button>
          ))}
          <Button
            variant="outline"
            className="h-12 text-lg col-start-2"
            onClick={() => handleNumberPadClick('0')}
          >
            0
          </Button>
          <Button
            variant="outline"
            className="h-12 text-lg col-start-3"
            onClick={handleBackspace}
          >
            ⌫
          </Button>
        </div>
      </div>
    </div>
  );
}
