import React from 'react';
import { Link } from 'wouter';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download } from 'lucide-react';

export default function DownloadLogo() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8">
        <Link href="/" className="flex items-center text-gray-600 hover:text-purple-500 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </div>
      
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-3">Bondify Logo Download</h1>
        <p className="text-gray-600">Download the Bondify logo in different formats for your use.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        <div className="border border-gray-200 rounded-xl p-8 flex flex-col items-center text-center hover:shadow-md transition-shadow">
          <div className="w-32 h-32 mb-6">
            <Logo size={128} withText={false} asLink={false} />
          </div>
          <h2 className="text-xl font-semibold mb-2">SVG Format</h2>
          <p className="text-gray-600 mb-6">Vector format, perfect for any size. Maintains quality when scaled.</p>
          <Button as="a" href="/bondify-logo.svg" download="bondify-logo.svg" className="flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Download SVG
          </Button>
        </div>
        
        <div className="border border-gray-200 rounded-xl p-8 flex flex-col items-center text-center hover:shadow-md transition-shadow">
          <div className="w-32 h-32 mb-6 overflow-hidden rounded-xl">
            <img src="/bondify-logo.png" alt="Bondify Logo PNG" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-xl font-semibold mb-2">PNG Format</h2>
          <p className="text-gray-600 mb-6">Standard format, compatible with most applications. Includes transparency.</p>
          <Button as="a" href="/bondify-logo.png" download="bondify-logo.png" className="flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Download PNG
          </Button>
        </div>
      </div>
      
      <div className="mt-16 text-center">
        <h3 className="text-xl font-semibold mb-4">Brand Usage Guidelines</h3>
        <div className="max-w-2xl mx-auto text-gray-600 space-y-4 text-left">
          <p>When using the Bondify logo, please:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Maintain adequate clear space around the logo</li>
            <li>Do not alter the colors or proportions of the logo</li>
            <li>Do not place the logo on busy backgrounds that reduce visibility</li>
            <li>Do not add effects (shadows, glows, etc.) to the logo</li>
          </ul>
          <p className="mt-4">The Bondify logo represents our brand identity. Using it consistently helps build trust and recognition.</p>
        </div>
      </div>
    </div>
  );
}