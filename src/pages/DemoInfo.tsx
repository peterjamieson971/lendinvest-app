import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Coffee, Linkedin, Globe, ArrowLeft, Sparkles } from 'lucide-react';

export const DemoInfo: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F1F5F9] via-[#E2E8F0] to-[#F8FAFC] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="https://cdn.mortgagestrategy.co.uk/content/uploads/2016/05/LendInvest-logo--768x270.gif"
            alt="LendInvest"
            className="h-12 mx-auto mb-4"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              target.style.display = 'none';
              if (target.parentElement) {
                const fallback = document.createElement('div');
                fallback.className = 'text-3xl font-bold text-[#0A1628]';
                fallback.textContent = 'LendInvest';
                target.parentElement.appendChild(fallback);
              }
            }}
          />
        </div>

        {/* Main Card */}
        <Card className="p-8 md:p-12">
          <div className="text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#FFB800] to-[#FF8C00] mb-6">
              <Coffee className="w-10 h-10 text-white" />
            </div>

            {/* Heading */}
            <h1 className="text-3xl md:text-4xl font-bold text-[#0A1628] mb-4">
              Plot Twist! <Sparkles className="inline w-8 h-8 text-[#FFB800]" />
            </h1>

            <p className="text-xl text-[#64748B] mb-6">
              This is actually a demo site...
            </p>

            {/* Message */}
            <div className="bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-lg p-6 mb-8 text-left">
              <p className="text-[#0A1628] leading-relaxed mb-4">
                While I'd love to approve your £500k bridging loan in the next 3 minutes using AI magic ✨,
                this is actually a demonstration project I built for an interview process.
              </p>
              <p className="text-[#0A1628] leading-relaxed mb-4">
                The good news? You can still explore the full application journey by signing in with the demo credentials:
              </p>
              <div className="bg-white rounded-lg p-4 mb-4 font-mono text-sm">
                <div className="flex justify-between mb-2">
                  <span className="text-[#64748B]">Email:</span>
                  <span className="text-[#0A1628] font-semibold">john@home.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Password:</span>
                  <span className="text-[#0A1628] font-semibold">111111</span>
                </div>
              </div>
              <p className="text-[#64748B] text-sm">
                <strong className="text-[#0A1628]">Want to connect?</strong> Check out my work or get in touch below!
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <a
                href="https://linkedin.com/in/pjamieson"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <Button variant="primary" icon={<Linkedin />}>
                  Connect on LinkedIn
                </Button>
              </a>

              <a
                href="https://jamieson.digital"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <Button variant="secondary" icon={<Globe />}>
                  Visit My Website
                </Button>
              </a>
            </div>

            {/* Back Button */}
            <div className="pt-6 border-t border-[#E2E8F0]">
              <Button
                variant="ghost"
                icon={<ArrowLeft />}
                onClick={() => navigate('/')}
              >
                Back to Home
              </Button>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[#64748B]">
            Built with React, TypeScript, Tailwind CSS v4, and a healthy dose of caffeine ☕
          </p>
        </div>
      </div>
    </div>
  );
};
