//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Diggity.Entities
{
    using System;
    using System.Collections.Generic;
    
    public partial class Exercise : DiggityEntity
    {
        public Exercise()
        {
            this.PersonalRecordHistories = new HashSet<PersonalRecord>();
            this.WorkoutSets = new HashSet<WorkoutSet>();
            this.WodExercises = new HashSet<WodExercise>();
        }
    
        public int Id { get; set; }
        public string Name { get; set; }
        public string Abbreviation { get; set; }
        public string Description { get; set; }
        public int ExerciseTypeId { get; set; }
        public Nullable<int> WendlerGroupId { get; set; }
    
        public virtual ExerciseType ExerciseType { get; set; }
        public virtual ICollection<PersonalRecord> PersonalRecordHistories { get; set; }
        public virtual ICollection<WorkoutSet> WorkoutSets { get; set; }
        public virtual ICollection<WodExercise> WodExercises { get; set; }
        public virtual WendlerGroup WendlerGroup { get; set; }
    }
}
