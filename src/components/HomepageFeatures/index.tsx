import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: string;
  link: string;
  isExternal?: boolean;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Get Started',
    icon: '📚',
    description: 'Explore our comprehensive documentation for Unreal Engine templates and get started quickly.',
    link: '/docs/intro',
  },
  {
    title: 'ArchViz Navigation',
    icon: '🎮',
    description: 'Learn how to use our ArchViz Navigation template for your architectural visualization projects.',
    link: '/docs/archviz-navigation',
  },
  {
    title: 'Latest Updates',
    icon: '📝',
    description: 'Stay up to date with the latest news, tutorials, and announcements from Third Space Interactive.',
    link: '/blog',
  },
];

function Feature({title, icon, description, link, isExternal}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <Link to={link} className={styles.featureCard}>
        <div className={styles.featureIcon}>{icon}</div>
        <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
        <p className={styles.featureDescription}>{description}</p>
      </Link>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={clsx('row', styles.featuresRow)}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
