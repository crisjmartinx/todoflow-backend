import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Tag } from 'src/tags/entities/tag.entity';
import { User } from 'src/auth/entities/user.entity';

function getRandomColorWithAlpha(): string {
  const letters = '0123456789ABCDEF';
  let color = '';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return '#' + color + '99';
}

@Entity({ name: 'notes' })
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'boolean' })
  isPinned: boolean;

  @Column({ type: 'boolean' })
  isArchived: boolean;

  @Column({
    type: 'varchar',
    length: 9,
  })
  color: string;

  @ManyToOne(() => Tag, (tag) => tag.notes, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'tagId' })
  tag: Tag;

  @ManyToOne(() => User, (user) => user.notes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  tagItem: string;
  note: Tag[];

  constructor() {
    this.color = getRandomColorWithAlpha();
  }
}
