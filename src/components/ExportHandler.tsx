import React, { useState } from 'react';
import { utils } from 'ethers';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { RequestSummary } from '../types';
import { Download, FileText, X } from 'lucide-react';


// Type definitions
interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface InvoiceParty {
  address: string;
  businessName?: string;
  taxId?: string;
}

interface InvoiceData {
  invoiceNumber: string;
  issuedDate: string;
  dueDate: string;
  from: InvoiceParty;
  to: InvoiceParty;
  amount: string;
  currency: string;
  status: string;
  network: string;
  paymentChain: string;
  items?: InvoiceItem[];
}

interface ExportHandlerProps {
  requests: RequestSummary[];
  address: string | null;
  onClose?: () => void;

}

declare global {
  interface Window {
    html2pdf: any;
  }
}

const RENDER_DELAY_MS = 3000;

export default function ExportHandler({ requests, address, onClose }: ExportHandlerProps) {
  const [isInvoiceMenuOpen, setIsInvoiceMenuOpen] = useState(false);

  const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.head.appendChild(script);
    });
  };

  const exportToJSON = () => {
    const data = {
      address,
      exportDate: new Date().toISOString(),
      requests: requests.map(req => ({
        ...req,
        expectedAmount: utils.formatEther(req.expectedAmount),
        date: new Date(req.timestamp * 1000).toISOString(),
      })),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'request-network-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const formatRequestId = (requestId: string) => {
    return `Request ${requestId.slice(0, 8)}...`;
  };

  const ensureHtml2PdfLoaded = async () => {
    if (typeof window.html2pdf === 'undefined') {
      await loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
      );
    }
  };

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const exportToPDF = async (request: RequestSummary) => {
    await ensureHtml2PdfLoaded();
    const invoiceData = createInvoiceData(request, address);
    const content = generateInvoiceHTML(invoiceData);

    const element = document.createElement('div');
    element.innerHTML = content;
    document.body.appendChild(element);

    await sleep(RENDER_DELAY_MS);

    const opt = {
      margin: 10,
      filename: `invoice-${invoiceData.invoiceNumber}.pdf`,
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait',
        compress: true,
      },
    };

    try {
      await window.html2pdf().from(element).set(opt).save();
    } finally {
      document.body.removeChild(element);
    }
  };

  const createInvoiceData = (request: RequestSummary, senderAddress: string | null): InvoiceData => {
    const issuedDate = new Date(request.timestamp * 1000);
    const dueDate = new Date(issuedDate.getTime() + 30 * 24 * 60 * 60 * 1000);
  
    return {
      invoiceNumber: request.requestId,
      issuedDate: issuedDate.toLocaleDateString(),
      dueDate: dueDate.toLocaleDateString(),
      from: {
        address: senderAddress || 'Unknown',
      },
      to: {
        address: request.payee,
      },
      amount: utils.formatEther(request.expectedAmount),
      currency: request.currencySymbol,
      status: request.state,
      network: 'Sepolia',
      paymentChain: 'Ethereum',
    };
  };

  const generateInvoiceHTML = (data: InvoiceData): string => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Request Network Invoice #${data.invoiceNumber}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
            
            body {
              font-family: 'Inter', sans-serif;
              line-height: 1.6;
              color: #1a1a1a;
              margin: 0;
              padding: 0;
            }
            
            .invoice-container {
              max-width: 800px;
              margin: 40px auto;
              padding: 40px;
              background: #ffffff;
              box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
            }
            
            .header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              margin-bottom: 48px;
              padding-bottom: 24px;
              border-bottom: 1px solid #e5e7eb;
            }
            
            .logo-section {
              flex: 1;
            }
            
            .logo {
              font-size: 24px;
              font-weight: 700;
              color: #2563eb;
              margin: 0;
            }
            
            .invoice-info {
              text-align: right;
            }
            
            .invoice-number {
              font-size: 14px;
              color: #6b7280;
              margin-bottom: 8px;
            }
            
            .dates {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 24px;
              margin-bottom: 48px;
            }
            
            .date-group {
              background: #f9fafb;
              padding: 16px;
              border-radius: 8px;
            }
            
            .date-label {
              font-size: 12px;
              text-transform: uppercase;
              color: #6b7280;
              margin-bottom: 4px;
            }
            
            .date-value {
              font-size: 16px;
              font-weight: 600;
              color: #1f2937;
            }
            
            .address-container {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 48px;
              margin-bottom: 48px;
            }
            
            .address-block h3 {
              font-size: 14px;
              text-transform: uppercase;
              color: #6b7280;
              margin-bottom: 12px;
            }
            
            .address {
              font-family: monospace;
              font-size: 14px;
              background: #f9fafb;
              padding: 12px;
              border-radius: 6px;
              word-break: break-all;
            }
            
            .payment-details {
              background: #f9fafb;
              padding: 24px;
              border-radius: 12px;
              margin-bottom: 48px;
            }
            
            .amount {
              font-size: 32px;
              font-weight: 700;
              color: #2563eb;
              margin-bottom: 16px;
            }
            
            .status-badge {
              display: inline-block;
              padding: 6px 12px;
              border-radius: 9999px;
              font-size: 12px;
              font-weight: 500;
            }
            
            .status-created {
              background: #dbeafe;
              color: #1e40af;
            }
            
            .status-paid {
              background: #d1fae5;
              color: #065f46;
            }
            
            .network-info {
              background: #ffffff;
              border: 1px solid #e5e7eb;
              border-radius: 12px;
              overflow: hidden;
            }
            
            .network-info table {
              width: 100%;
              border-collapse: collapse;
            }
            
            .network-info th,
            .network-info td {
              padding: 12px 16px;
              text-align: left;
              border-bottom: 1px solid #e5e7eb;
            }
            
            .network-info th {
              font-weight: 500;
              color: #6b7280;
              background: #f9fafb;
              width: 30%;
            }
            
            .network-info tr:last-child th,
            .network-info tr:last-child td {
              border-bottom: none;
            }
            
            .footer {
              margin-top: 48px;
              padding-top: 24px;
              border-top: 1px solid #e5e7eb;
              text-align: center;
              color: #6b7280;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <div class="header">
              <div class="logo-section">
                <h1 class="logo">REQUEST NETWORK</h1>
              </div>
              <div class="invoice-info">
                <div class="invoice-number">Invoice #${data.invoiceNumber.slice(0, 8)}...</div>
              </div>
            </div>
  
            <div class="dates">
              <div class="date-group">
                <div class="date-label">Issue Date</div>
                <div class="date-value">${data.issuedDate}</div>
              </div>
              <div class="date-group">
                <div class="date-label">Payment Due</div>
                <div class="date-value">${data.dueDate}</div>
              </div>
            </div>
  
            <div class="address-container">
              <div class="address-block">
                <h3>From</h3>
                <div class="address">${data.from.address}</div>
                ${data.from.businessName ? `<p>${data.from.businessName}</p>` : ''}
                ${data.from.taxId ? `<p>Tax ID: ${data.from.taxId}</p>` : ''}
              </div>
              <div class="address-block">
                <h3>To</h3>
                <div class="address">${data.to.address}</div>
                ${data.to.businessName ? `<p>${data.to.businessName}</p>` : ''}
                ${data.to.taxId ? `<p>Tax ID: ${data.to.taxId}</p>` : ''}
              </div>
            </div>
  
            <div class="payment-details">
              <div class="amount">${data.amount} ${data.currency}</div>
              <span class="status-badge ${data.status === 'paid' ? 'status-paid' : 'status-created'}">
                ${data.status.toUpperCase()}
              </span>
            </div>
  
            <div class="network-info">
              <table>
                <tr>
                  <th>Network</th>
                  <td>${data.network}</td>
                </tr>
                <tr>
                  <th>Payment Chain</th>
                  <td>Ethereum</td>
                </tr>
                <tr>
                  <th>Currency</th>
                  <td>${data.currency}</td>
                </tr>
                <tr>
                  <th>Request ID</th>
                  <td>${data.invoiceNumber}</td>
                </tr>
              </table>
            </div>
  
            ${data.items ? `
              <div class="items-section">
                <table class="items-table">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Unit Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${data.items.map(item => `
                      <tr>
                        <td>${item.description}</td>
                        <td>${item.quantity}</td>
                        <td>${item.unitPrice} ${data.currency}</td>
                        <td>${item.total} ${data.currency}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            ` : ''}
  
            <div class="footer">
              <p>This invoice was generated through the Request Network Protocol</p>
            </div>
          </div>
        </body>
      </html>
    `;
  };


   // Modal version
   if (onClose) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-[#0a051e] border border-gray-800 rounded-xl p-6 max-w-lg w-full mx-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Export Invoice</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {requests.map((request) => (
              <button
                key={request.requestId}
                onClick={() => exportToPDF(request)}
                className="w-full px-4 py-3 text-left bg-gray-900/50 hover:bg-gray-800 transition-colors rounded-lg flex flex-col gap-1"
              >
                <span className="text-white font-medium">
                  {formatRequestId(request.requestId)}
                </span>
                <span className="text-gray-400 text-sm">
                  {utils.formatEther(request.expectedAmount)} {request.currencySymbol}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Inline version
  return (
    <div className="flex gap-4 mt-4">
      <button
        onClick={exportToJSON}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
      >
        <Download size={16} />
        <span>Export to JSON</span>
      </button>
      
      <div className="relative">
        <button
          onClick={() => setIsInvoiceMenuOpen(!isInvoiceMenuOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors"
        >
          <FileText size={16} />
          <span>Export Invoice</span>
        </button>
        
        {isInvoiceMenuOpen && (
          <div className="absolute left-0 mt-2 w-64 bg-[#0a051e] border border-gray-800 rounded-lg shadow-lg z-50">
            {requests.map((request) => (
              <button
                key={request.requestId}
                onClick={() => {
                  exportToPDF(request);
                  setIsInvoiceMenuOpen(false);
                }}
                className="w-full px-4 py-3 text-left hover:bg-gray-800 transition-colors flex flex-col gap-1 border-b border-gray-800 last:border-0"
              >
                <span className="text-white font-medium">
                  {formatRequestId(request.requestId)}
                </span>
                <span className="text-gray-400 text-sm">
                  {utils.formatEther(request.expectedAmount)} {request.currencySymbol}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}