import fs from 'fs';
import path from 'path';

// Helper to count sentences reliably
export function countSentences(text: string): number {
  const cleaned = text.trim();
  const sentences = cleaned.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);
  return sentences.length;
}

// We will construct all 10 articles with high quality editorial copy.
// Each article will have:
// - introduction: exactly 1 paragraph (4-6 sentences, ideally 5)
// - sections: exactly 4 sections, each with exactly 2 paragraphs (each with 4-6 sentences, ideally 5)
//   Total section paragraphs = 4 * 2 = 8
// - conclusion: exactly 1 paragraph (4-6 sentences, ideally 5)
// Total paragraphs = 1 + 8 + 1 = 10 paragraphs!
// - paragraphs: array of all 10 paragraphs for direct access and testing
// - 4 FAQs per article
