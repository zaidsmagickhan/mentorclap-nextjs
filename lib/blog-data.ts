// lib/blog-data.ts
export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    content: string;
    excerpt: string;
    author: string;
    publishedAt: string;
    imageUrl?: string;
}

// Mock data - replace with your Django API
export const blogPosts: BlogPost[] = [
    {
        id: '1',
        slug: 'getting-started-with-nextjs',
        title: 'Getting Started with Next.js',
        content: `
      <h1>Getting Started with Next.js</h1>
      <p>Next.js is a React framework that enables server-side rendering and static site generation.</p>
      <p>It provides excellent performance and SEO benefits out of the box.</p>
      <h2>Key Features</h2>
      <ul>
        <li>Server-Side Rendering (SSR)</li>
        <li>Static Site Generation (SSG)</li>
        <li>API Routes</li>
        <li>File-based Routing</li>
      </ul>
    `,
        excerpt: 'Learn how to set up and use Next.js for your React applications with server-side rendering.',
        author: 'John Doe',
        publishedAt: '2024-01-15',
        imageUrl: '/blog/nextjs-intro.jpg'
    },
    {
        id: '2',
        slug: 'ssr-vs-csr',
        title: 'SSR vs CSR: Understanding the Differences',
        content: `
      <h1>SSR vs CSR: Understanding the Differences</h1>
      <p>Server-Side Rendering (SSR) and Client-Side Rendering (CSR) are two different approaches to rendering web applications.</p>
      <h2>Server-Side Rendering (SSR)</h2>
      <p>With SSR, the HTML is generated on the server for each request.</p>
      <h2>Client-Side Rendering (CSR)</h2>
      <p>With CSR, the browser downloads minimal HTML and then uses JavaScript to render the content.</p>
    `,
        excerpt: 'Explore the differences between Server-Side Rendering and Client-Side Rendering.',
        author: 'Jane Smith',
        publishedAt: '2024-01-10',
        imageUrl: '/blog/ssr-csr.jpg'
    }
];

export async function getBlogPosts(): Promise<BlogPost[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return blogPosts;
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 100));
    const post = blogPosts.find(post => post.slug === slug);
    return post || null;
}