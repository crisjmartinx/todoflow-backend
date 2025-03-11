import { Note } from 'src/notes/entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tags' })
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 9 })
  color: string;

  @Column('text', { array: true, nullable: true })
  items: string[];

  @OneToMany(() => Note, (note) => note.tag)
  notes: Note[];
}
