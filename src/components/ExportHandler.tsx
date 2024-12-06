import React from 'react';
import { utils } from 'ethers';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { RequestSummary } from '../types';

// Type definitions
interface InvoiceItem {
  name: string;
  quantity: number;
  unitPrice: string;
  discount?: string;
  tax?: {
    amount: number;
  };
  total: string;
}

interface InvoiceData {
  invoiceNumber: string;
  issuedDate: string;
  dueDate: string;
  from: {
    address: string;
    firstName?: string;
    lastName?: string;
    taxRegistration?: string;
    businessName?: string;
    streetAddress?: string;
    city?: string;
    country?: string;
  };
  to: {
    address: string;
    firstName?: string;
    lastName?: string;
    taxRegistration?: string;
    businessName?: string;
    streetAddress?: string;
    city?: string;
    country?: string;
  };
  amount: string;
  currency: string;
  status: string;
  network: string;
  paymentChain: string;
  invoiceCurrency: string;
  settlementCurrency: string;
  items?: InvoiceItem[];
  note?: string;
}

interface ExportHandlerProps {
  requests: RequestSummary[];
  address: string | null;
}

declare global {
  interface Window {
    html2pdf: any;
  }
}

const RENDER_DELAY_MS = 3000;

export default function ExportHandler({ requests, address }: ExportHandlerProps) {
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
    const invoiceData = createInvoiceData(request);
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

  const createInvoiceData = (request: RequestSummary): InvoiceData => {
    return {
      invoiceNumber: request.requestId,
      issuedDate: new Date(request.timestamp * 1000).toLocaleDateString(),
      dueDate: new Date(request.timestamp * 1000 + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      from: {
        address: address || 'Unknown',
        firstName: '',
        lastName: '',
        taxRegistration: '',
        businessName: '',
        streetAddress: '',
        city: '',
        country: ''
      },
      to: {
        address: request.payee,
        firstName: '',
        lastName: '',
        taxRegistration: '',
        businessName: '',
        streetAddress: '',
        city: '',
        country: ''
      },
      amount: utils.formatEther(request.expectedAmount),
      currency: request.currencySymbol,
      status: request.state,
      network: 'Sepolia',
      paymentChain: 'Ethereum',
      invoiceCurrency: request.currencySymbol,
      settlementCurrency: request.currencySymbol,
      items: []
    };
  };

  const generateInvoiceHTML = (invoiceData: InvoiceData): string => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Request Network Invoice - ${invoiceData.invoiceNumber}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 40px;
              line-height: 1.6;
              color: #333;
            }
            .invoice-container {
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 1px solid #eee;
            }
            .header h1 {
              margin: 0;
              color: #333;
              font-size: 28px;
            }
            .dates {
              display: flex;
              justify-content: space-between;
              margin-bottom: 30px;
            }
            .address-container {
              display: flex;
              justify-content: space-between;
              margin-bottom: 40px;
              background-color: #FBFBFB;
              padding: 20px;
              gap: 40px;
            }
            .address-block {
              flex: 1;
            }
            .address-block h3 {
              margin: 0 0 10px 0;
              color: #666;
            }
            .address {
              font-family: monospace;
              font-size: 12px;
              word-break: break-all;
              margin: 5px 0;
            }
            .payment-details {
              margin: 30px 0;
            }
            .amount {
              font-size: 24px;
              font-weight: bold;
              color: #2563eb;
              margin: 10px 0;
            }
            .status-badge {
              display: inline-block;
              padding: 4px 8px;
              border-radius: 4px;
              font-size: 12px;
              background: ${invoiceData.status === 'paid' ? '#dcfce7' : '#fee2e2'};
              color: ${invoiceData.status === 'paid' ? '#166534' : '#991b1b'};
            }
            .network-info {
              margin-top: 30px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 15px 0;
            }
            th, td {
              padding: 12px;
              text-align: left;
              border: 1px solid #eee;
            }
            th {
              background-color: #f8f8f8;
              font-weight: 600;
              color: #666;
            }
            .note {
              margin-top: 30px;
              padding: 15px;
              background-color: #f8f8f8;
              border-radius: 4px;
            }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <div class="header">
              <h1>REQUEST NETWORK INVOICE</h1>
              <p>Invoice #${invoiceData.invoiceNumber}</p>
            </div>

            <div class="dates">
              <div>
                <strong>Issued Date:</strong>
                <p>${invoiceData.issuedDate}</p>
              </div>
              <div>
                <strong>Payment Due:</strong>
                <p>${invoiceData.dueDate}</p>
              </div>
            </div>

            <div class="address-container">
              <div class="address-block">
                <h3>From:</h3>
                <p class="address">${invoiceData.from.address}</p>
                ${invoiceData.from.businessName ? `<p>${invoiceData.from.businessName}</p>` : ''}
                ${invoiceData.from.firstName ? `<p>${invoiceData.from.firstName} ${invoiceData.from.lastName}</p>` : ''}
                ${invoiceData.from.streetAddress ? `<p>${invoiceData.from.streetAddress}</p>` : ''}
                ${invoiceData.from.city ? `<p>${invoiceData.from.city}, ${invoiceData.from.country}</p>` : ''}
                ${invoiceData.from.taxRegistration ? `<p>VAT: ${invoiceData.from.taxRegistration}</p>` : ''}
              </div>
              <div class="address-block">
                <h3>To:</h3>
                <p class="address">${invoiceData.to.address}</p>
                ${invoiceData.to.businessName ? `<p>${invoiceData.to.businessName}</p>` : ''}
                ${invoiceData.to.firstName ? `<p>${invoiceData.to.firstName} ${invoiceData.to.lastName}</p>` : ''}
                ${invoiceData.to.streetAddress ? `<p>${invoiceData.to.streetAddress}</p>` : ''}
                ${invoiceData.to.city ? `<p>${invoiceData.to.city}, ${invoiceData.to.country}</p>` : ''}
                ${invoiceData.to.taxRegistration ? `<p>VAT: ${invoiceData.to.taxRegistration}</p>` : ''}
              </div>
            </div>

            <div class="payment-details">
              <h3>Payment Details</h3>
              <p class="amount">${invoiceData.amount} ${invoiceData.currency}</p>
              <p><strong>Status:</strong> <span class="status-badge">${invoiceData.status}</span></p>
            </div>

            <div class="network-info">
              <h3>Network Information</h3>
              <table>
                <tr>
                  <th>Network</th>
                  <td>${invoiceData.network}</td>
                </tr>
                <tr>
                  <th>Payment Chain</th>
                  <td>${invoiceData.paymentChain}</td>
                </tr>
                <tr>
                  <th>Invoice Currency</th>
                  <td>${invoiceData.invoiceCurrency}</td>
                </tr>
                <tr>
                  <th>Settlement Currency</th>
                  <td>${invoiceData.settlementCurrency}</td>
                </tr>
                <tr>
                  <th>Request ID</th>
                  <td>${invoiceData.invoiceNumber}</td>
                </tr>
              </table>
            </div>

            ${invoiceData.items && invoiceData.items.length > 0 ? `
              <div class="items-table">
                <h3>Invoice Items</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Unit Price</th>
                      <th>Discount</th>
                      <th>Tax</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${invoiceData.items.map((item: InvoiceItem) => `
                      <tr>
                        <td>${item.name || '-'}</td>
                        <td>${item.quantity || '-'}</td>
                        <td>${item.unitPrice || '-'} ${invoiceData.currency}</td>
                        <td>${item.discount || '-'}</td>
                        <td>${item.tax?.amount ? `${item.tax.amount}%` : '-'}</td>
                        <td>${item.total || '-'} ${invoiceData.currency}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            ` : ''}

            ${invoiceData.note ? `
              <div class="note">
                <h3>Note:</h3>
                <p>${invoiceData.note}</p>
              </div>
            ` : ''}
          </div>
        </body>
      </html>
    `;
  };

  return (
    <div className="flex gap-4 mt-4">
      <button
        onClick={exportToJSON}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
      >
        Export to JSON
      </button>
      
      <div className="relative group">
        <button
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded transition"
        >
          Export Invoice
        </button>
        <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg hidden group-hover:block z-50">
          {requests.map((request) => (
          <button
          key={request.requestId}
          onClick={() => exportToPDF(request)}
          className="w-full px-4 py-3 text-left hover:bg-gray-800 transition-colors flex flex-col gap-1 border-b border-gray-800 last:border-0"
        >
          <span className="text-gray-500 text-xs font-mono">
            {formatRequestId(request.requestId)}
          </span>
          {/* <span className="text-gray-500 text-xs font-mono">
            {request.requestId}
          </span> */}
        </button>
          ))}
        </div>
      </div>
    </div>
  );
}