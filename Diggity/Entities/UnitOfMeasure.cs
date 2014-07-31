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
    
    public partial class UnitOfMeasure : DiggityEntity
    {
        public UnitOfMeasure()
        {
            this.WorkoutSets = new HashSet<WorkoutSet>();
            this.UserPreferences = new HashSet<UserPreference>();
            this.ExerciseTypes = new HashSet<ExerciseType>();
            this.PersonalRecordHistories = new HashSet<PersonalRecord>();
        }
    
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    
        public virtual ICollection<WorkoutSet> WorkoutSets { get; set; }
        public virtual ICollection<UserPreference> UserPreferences { get; set; }
        public virtual ICollection<ExerciseType> ExerciseTypes { get; set; }
        public virtual ICollection<PersonalRecord> PersonalRecordHistories { get; set; }
    }
}
