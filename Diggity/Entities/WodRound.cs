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
    
    public partial class WodRound : DiggityEntity
    {
        public WodRound()
        {
            this.WodExercises = new HashSet<WodExercise>();
        }
    
        public int Id { get; set; }
        public short SortOrder { get; set; }
        public int WodId { get; set; }
    
        public virtual ICollection<WodExercise> WodExercises { get; set; }
        public virtual Wod Wod { get; set; }
    }
}
