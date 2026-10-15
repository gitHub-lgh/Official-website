import { notFound } from 'next/navigation';
import DocumentLayout from '@/components/DocumentLayout';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { getDocument, getAvailableApps, getAvailableDocumentTypes } from '@/lib/markdown';

interface PageProps {
  params: Promise<{
    app: string;
    docType: string;
  }>;
}

export default async function DocumentPage({ params }: PageProps) {
  const { app, docType } = await params;
  
  // 验证应用是否存在
  const availableApps = getAvailableApps();
  if (!availableApps.includes(app)) {
    notFound();
  }

  // 仅允许访问该应用目录中实际存在的 Markdown 文档
  const supportedDocTypes = getAvailableDocumentTypes(app);
  if (!supportedDocTypes.includes(docType)) {
    notFound();
  }

  const document = getDocument(app, docType);

  if (!document) {
    notFound();
  }

  return (
    <DocumentLayout>
      {/* 内容区域 */}
      <MarkdownRenderer content={document.content} />
    </DocumentLayout>
  );
}

// 生成静态页面
export async function generateStaticParams() {
  const availableApps = getAvailableApps();
  
  const params = [];
  for (const app of availableApps) {
    for (const docType of getAvailableDocumentTypes(app)) {
      params.push({ app, docType });
    }
  }
  
  return params;
}
