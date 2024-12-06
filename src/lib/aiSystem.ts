// src/lib/aiSystem.ts

export interface PaymentData {
  amount: number;
  timeToPay: number;
  isOnTime: boolean;
  frequency: number;
  successRate: number;
}

export interface AIInsights {
  score: number;
  riskLevel: string;
  predictedNextPayment: Date;
  insights: string[];
}

export default class AIReputationSystem {
  private weights = {
    paymentHistory: 0.3,
    timelinessScore: 0.25,
    amountReliability: 0.2,
    frequencyScore: 0.15,
    volatilityScore: 0.1
  };

  public calculateReputationScore(address: string, payments: PaymentData[]): number {
    if (payments.length === 0) return 0;

    const successRate = this.calculateSuccessRate(payments);
    const timeliness = this.calculateTimelinessScore(payments);
    const amountReliability = this.calculateAmountReliability(payments);
    const frequencyScore = this.calculateFrequencyScore(payments);
    const volatilityScore = this.calculateVolatilityScore(payments);

    const finalScore = (
      successRate * this.weights.paymentHistory +
      timeliness * this.weights.timelinessScore +
      amountReliability * this.weights.amountReliability +
      frequencyScore * this.weights.frequencyScore +
      volatilityScore * this.weights.volatilityScore
    );

    return Math.min(100, Math.max(0, finalScore));
  }

  private calculateSuccessRate(payments: PaymentData[]): number {
    const successful = payments.filter(p => p.isOnTime).length;
    return (successful / payments.length) * 100;
  }

  private calculateTimelinessScore(payments: PaymentData[]): number {
    const decay = 0.1;
    return payments.reduce((score, payment) => {
      const daysLate = Math.max(0, payment.timeToPay - 30);
      return score + (100 * Math.exp(-decay * daysLate));
    }, 0) / payments.length;
  }

  private calculateAmountReliability(payments: PaymentData[]): number {
    const amounts = payments.map(p => p.amount);
    const mean = amounts.reduce((a, b) => a + b) / amounts.length;
    const variance = amounts.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / amounts.length;
    const standardDeviation = Math.sqrt(variance);
    
    return Math.max(0, 100 - (standardDeviation / mean) * 100);
  }

  private calculateFrequencyScore(payments: PaymentData[]): number {
    const averageFrequency = payments.reduce((acc, p) => acc + p.frequency, 0) / payments.length;
    return Math.min(100, averageFrequency * 10);
  }

  private calculateVolatilityScore(payments: PaymentData[]): number {
    const timeDeltas = payments.slice(1).map((payment, i) => {
      return Math.abs(payment.timeToPay - payments[i].timeToPay);
    });
    
    const averageVolatility = timeDeltas.length > 0 
      ? timeDeltas.reduce((a, b) => a + b, 0) / timeDeltas.length 
      : 0;
    return Math.max(0, 100 - averageVolatility);
  }

  public getPredictedPaymentDate(payments: PaymentData[]): Date {
    if (payments.length < 2) return new Date();

    const intervals = payments.slice(1).map((payment, i) => {
      return payment.timeToPay - payments[i].timeToPay;
    });

    const averageInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    return new Date(Date.now() + averageInterval * 24 * 60 * 60 * 1000);
  }

  public getPaymentRiskLevel(address: string, payments: PaymentData[]): string {
    const score = this.calculateReputationScore(address, payments);
    
    if (score >= 80) return 'LOW';
    if (score >= 60) return 'MEDIUM';
    return 'HIGH';
  }

  public generateInsights(payments: PaymentData[]): string[] {
    const insights: string[] = [];
    const score = this.calculateReputationScore('', payments);

    if (score < 60) {
      insights.push('Payment reliability needs improvement');
      if (payments.filter(p => !p.isOnTime).length > payments.length * 0.3) {
        insights.push('High rate of late payments detected');
      }
    }

    const volatility = this.calculateVolatilityScore(payments);
    if (volatility < 50) {
      insights.push('Payment patterns are irregular');
    }

    if (insights.length === 0) {
      insights.push('Payment history looks healthy');
      insights.push('Consistent payment patterns detected');
    }

    return insights;
  }
}