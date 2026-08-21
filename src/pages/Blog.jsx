import { Link } from 'react-router-dom'
import { Seo } from '@/components/ui/Widgets'
import {
  Section,
  RevealGroup,
  RevealItem,
  SectionHeading,
  PageHero,
  Tag,
  TAG_CYCLE,
} from '@/components/ui/Primitives'
import posts from '@/content/posts.json'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function PostCard({ post, index }) {
  return (
    <RevealItem>
      <Link
        to={`/blog/${post.slug}/`}
        className="group flex h-full flex-col overflow-hidden rounded-4xl border border-ink/10 bg-paper transition-all duration-500 ease-brand hover:-translate-y-1 hover:border-transparent hover:shadow-[0_28px_70px_-30px_rgba(40,37,26,0.32)]"
      >
        <div className="aspect-[8/5] w-full overflow-hidden">
          <img
            src={post.image.card.url}
            width={post.image.card.width}
            height={post.image.card.height}
            alt={post.image.alt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-brand group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col p-7">
          {post.category && (
            <Tag variant={TAG_CYCLE[index % TAG_CYCLE.length]} size="sm" className="mb-4 w-fit">
              {post.category}
            </Tag>
          )}
          <h3 className="text-fluid-lg leading-snug">{post.title}</h3>
          <p className="mt-3 flex-1 leading-relaxed text-ink/60">{post.excerpt}</p>
          <p className="mt-6 border-t border-ink/10 pt-4 text-fluid-xs uppercase tracking-[0.14em] text-ink/40">
            {formatDate(post.publishedAt)} · {post.readingTime} min read
          </p>
        </div>
      </Link>
    </RevealItem>
  )
}

export default function Blog() {
  return (
    <>
      <Seo
        title="Blog | 180 Method"
        description="Coaching notes on strength, nutrition, recovery and the mindset that holds it all together — from the team at 180 Method."
        path="/blog/"
      />

      <PageHero
        eyebrow="Where mind meets movement"
        title="The 180 perspective"
        lede="Explore practical, expert-backed insights, guides and resources on fitness, nutrition, recovery, mental health and everything in between."
      />

      <Section tone="paperAlt">
        <div className="container-x">
          {posts.length === 0 ? (
            <SectionHeading
              eyebrow="Coming soon"
              title="The first post is on its way"
              lede="We're writing it. Check back shortly, or follow 180 Method on Instagram for updates in the meantime."
            />
          ) : (
            <>
              <SectionHeading eyebrow="All posts" title="From the team" className="mb-14" />
              <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" gap={0.08}>
                {posts.map((post, index) => (
                  <PostCard key={post.slug} post={post} index={index} />
                ))}
              </RevealGroup>
            </>
          )}
        </div>
      </Section>
    </>
  )
}
