"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { getRecentPosts, type BlogPost } from "@/app/data/blog-posts";
import { CalendarDays, Clock, ChevronRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function BlogSection() {
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>(getRecentPosts(3));

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Arka plan süslemeleri */}
      <div className="absolute top-0 left-0 w-1/4 h-1 bg-macrosnip-red opacity-10"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1 bg-macrosnip-orange opacity-10"></div>

      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="red-gradient-text">Blog</span> & Haberler
            </h2>
            <p className="text-gray-400 max-w-xl">
              Güncel oyun güncellemeleri, ipuçları ve makrolarınızdan en iyi şekilde
              faydalanmanın yolları hakkında yazılarımızı keşfedin.
            </p>
          </div>

          <Button variant="outline" className="group valorant-button" asChild>
            <Link href="/blog">
              Tüm Yazıları Görüntüle
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPosts.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface BlogPostCardProps {
  post: BlogPost;
  index: number;
}

function BlogPostCard({ post, index }: BlogPostCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-macrosnip-dark valorant-angle border border-macrosnip-gray h-full flex flex-col group"
    >
      {/* Post resmi */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />

        {/* Kategori etiketi */}
        <div className="absolute bottom-3 left-3 bg-black bg-opacity-70 px-2 py-1 text-xs font-medium text-white rounded">
          {post.category}
        </div>
      </div>

      {/* İçerik alanı */}
      <div className="p-5 flex-grow flex flex-col">
        <div className="mb-3 flex items-center text-sm text-gray-400">
          <div className="flex items-center mr-4">
            <CalendarDays className="h-4 w-4 mr-1" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{post.readTime} dk okuma</span>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-macrosnip-red transition-colors">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>

        <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>

        {/* Yazar bilgisi */}
        <div className="flex items-center pt-4 border-t border-macrosnip-gray">
          <div className="relative w-8 h-8 rounded-full overflow-hidden">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="ml-3">
            <span className="block text-sm font-medium">{post.author.name}</span>
            <span className="block text-xs text-gray-400">{post.author.role}</span>
          </div>
        </div>
      </div>

      {/* Devam bağlantısı */}
      <div
        className={cn(
          "py-3 px-5 border-t border-macrosnip-gray flex justify-end",
          "bg-macrosnip-darker"
        )}
      >
        <Link
          href={`/blog/${post.slug}`}
          className="text-sm font-medium text-macrosnip-red flex items-center hover:underline"
        >
          Devamını Oku
          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
